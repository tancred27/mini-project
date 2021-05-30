const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const College = require("../models/college");
const key = config.get("sendgridAPIKey");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(key);

const sendEmail = (msg) => {
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.error(error);
    });
};

/**
 * @route POST /api/auth/user/register
 * @desc endpoint for user to register
 */
router.post("/user/register", async (req, res) => {
    const { name, rollNumber, email, mobile, college, branch, dob, company, info, year, password } = req.body;
    console.log(name, rollNumber, email, mobile, college, branch, dob, company, info, year, password);
    try {
        let user = await User.findOne({ email });
        if (user && user.activated) {
            return res.status(400).json({ msg: "user with given email already exists!" });
        } 
        user = await User.findOne({ rollNumber });
        if (user && user.activated) {
            return res.status(400).json({ msg: "user with given Roll Number already exists!" });
        }
        user = await User.findOne({ mobile });
        if (user && user.activated) {
            return res.status(400).json({ msg: "user with given mobile number already exists!" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const encryptedPass = await bcrypt.hash(password, salt);
            const doc = new User({
                name, rollNumber, email, mobile, college, branch, dob, company, info, year, password: encryptedPass
            });
            await doc.save();
            const msg = {
                to: email,
                from: "saiindra70@gmail.com",
                subject: "ATS account activation",
                text: `Kindly activate your account by clicking on the link - http://localhost:5000/api/auth/user/activate/${doc._id}`
            };
            sendEmail(msg);
            sendRes(res, 200);
        }
    } catch(error) {
        handleCatch(res, 500, error)
    };
});

/**
 * @route POST /api/auth/user/login
 * @desc endpoint for user to login
 */
router.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ "msg": "user with given email does not exist!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ "msg": "invalid credentials!" });
    }
    if(!user.activated) return res.json({ "msg": "account has not been activated yet, please check your email!"});
    const payload = {
        user: {
            id: user._id,
            type: "user"
        }
    };
    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if(err) throw err;
        res.status(200).json({ "msg": "login successful!", token, user });
    });
});

/**
 * @route GET /api/user/activate/:rollNumber
 * @desc endpoint to activate user's account
 */
router.get("/user/activate/:id", async (req, res) => {
    const { id } = req.params;
    var user = await User.findById(id);
    if (!user) {
        return res.status(400).json({ "msg": "Invalid link" });
    }
    try {
        user = await User.findByIdAndUpdate(id, { $set: { activated: true } }, { new: true });
        res.status(200).json({ "msg": "Account activated, please head to login page" });
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route POST /api/college/register
 * @desc endpoint to register college
 */
router.post("/college/register", async(req, res) => {
    const { collegeName, name, email, mobile, password } = req.body;
    try {
        let user = await College.findOne({ email });
        if (user && user.verified) {
            return res.status(400).json({ msg: "college with given email already exists!" });
        } 
        const salt = await bcrypt.genSalt(10);
        const encryptedPass = await bcrypt.hash(password, salt);
        const doc = new College({
            name, email, mobile, collegeName, password: encryptedPass
        });
        await doc.save();
        const msg = {
            to: email,
            from: "saiindra70@gmail.com",
            subject: `ATS account activation - ${collegeName}`,
            text: `Kindly activate your account by clicking on the link - http://localhost:5000/api/auth/college/activate/${doc._id}`
        };
        sendEmail(msg);
        sendRes(res, 200);
    } catch(error) {
        handleCatch(res, 500, error);
    };
});

/**
 * @route POST /api/auth/college/login
 * @desc endpoint for college login
 */
router.post("/college/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const college = await (await College.findOne({ email })).populate("events").execPopulate();
        if (!college) {
            return res.json({ "msg": "college with given email does not exist!" });
        }
        const match = await bcrypt.compare(password, college.password);
        if (!match) {
            return res.json({ "msg": "invalid credentials!" });
        }
        if(!college.verified) return res.json({ "msg": "account has not been activated yet, please check your email!"});
        const payload = {
            user: {
                id: college._id,
                type: "college"
            }
        };
        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if(err) throw err;
            res.status(200).json({ "msg": "login successful!", token, college });
        });
    } catch(error) {
        handleCatch(res, 500, error);
    };
});

/**
 * @route GET /api/college/activate/:collegeName
 * @desc endpoint to activate college account
 */
 router.get("/college/activate/:id", async (req, res) => {
    const { id } = req.params;
    var college = await College.findById(id);
    if (!college) {
        return res.status(400).json({ "msg": "Invalid link" });
    }
    try {
        college = await College.findByIdAndUpdate(id, { $set: { verified: true } }, { new: true });
        res.status(200).json({ "msg": "Account activated, please head to login page" });
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

module.exports = router;