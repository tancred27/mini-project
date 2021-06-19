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
const auth = require("../middleware/auth");
const Nexmo = require("nexmo");
const apiKey = config.get("apiKey");
const apiSecret = config.get("apiSecret");

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
    const { name, rollNumber, email, mobile, college, branch, company, info, year, password } = sanitizeInput(req.body);
    try {
        let user = await User.findOne({ email });
        if (user && user.activated) {
            return res.status(400).json({ msg: "Error : User with given email already exists!" });
        } 
        user = await User.findOne({ rollNumber });
        if (user && user.activated) {
            return res.status(400).json({ msg: "Error : User with given Roll Number already exists!" });
        }
        user = await User.findOne({ mobile });
        if (user && user.activated) {
            return res.status(400).json({ msg: "Error : User with given mobile number already exists!" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const encryptedPass = await bcrypt.hash(password, salt);
            const doc = new User({
                name, rollNumber, email, mobile, college, branch, company, info, year, password: encryptedPass
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
    const { email, password } = sanitizeInput(req.body);
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ "msg": "Error : User with given email does not exist!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ "msg": "Error : Invalid credentials!" });
    }
    if(!user.activated) {
        return res.json({ "msg": "Error : Account has not been activated yet, please check your email!"});
    }
    const payload = {
        user: {
            id: user._id,
            type: "user"
        }
    };
    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if(err) throw err;
        res.status(200).json({ token });
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
        return res.status(400).json({ "msg": "Error : Invalid link" });
    }
    try {
        user = await User.findByIdAndUpdate(id, { $set: { activated: true } }, { new: true });
        res.status(200).send("Account activated, please head to login page");
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route POST /api/college/register
 * @desc endpoint to register college
 */
router.post("/college/register", async (req, res) => {
    const { collegeName, name, email, mobile, password } = sanitizeInput(req.body);
    try {
        let user = await College.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "Error : College with given email already exists!" });
        }
        user = await College.findOne({ collegeName });
        if (user) {
            return res.status(400).json({ msg: "Error : College with given name already exists!" });
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
    const { email, password } = sanitizeInput(req.body);
    try {
        const college = await College.findOne({ email });
        if (!college) {
            return res.status(400).json({ "msg": "Error : College with given email does not exist!" });
        }
        const match = await bcrypt.compare(password, college.password);
        if (!match) {
            return res.status(400).json({ "msg": "Error : Invalid credentials!" });
        }
        if(!college.activated) {
            console.log("acc not activated");
            return res.status(400).json({ "msg": "Error : Account has not been activated yet, please check your email!" });
        }
        const payload = {
            user: {
                id: college._id,
                type: "college"
            }
        };
        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if(err) throw err;
            res.status(200).json({ token });
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
        return res.status(400).json({ "msg": "Error : Invalid link" });
    }
    try {
        college = await College.findByIdAndUpdate(id, { $set: { activated: true } }, { new: true });
        res.status(200).send("Account activated, please head to login page");
    } catch (error) {
        handleCatch(res, 500, error);
    }
});


/**
 * @route POST /api/auth/sms
 * @desc send an sms to an alumni or all alumni
 */
router.post("/sms", auth, async (req, res) => {
    try {
        let { to, text } = sanitizeInput(req.body);
        const nexmo = new Nexmo({
            apiKey,
            apiSecret
        });
        if (to === "All Alumni") {
            let users = await User.find({ college: req.user.id });
            users.map(user => {
                to = "91" + user.mobile;
                nexmo.message.sendSms("Nexmo", to, text);
            });
            sendRes(res, 200);
        }
        else {
            to = "91" + to;
            nexmo.message.sendSms("Nexmo", to, text);
            sendRes(res, 200);
        }
    }  catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route POST /api/auth/email
 * @desc send an email to an alumni or all alumni
 */
router.post("/email", auth, async (req, res) => {
    try {
        let { to, subject, text } = sanitizeInput(req.body);
        let from = "saiindra70@gmail.com";
        if (to === "All Alumni") {
            let users = await User.find({ college: req.user.id });
            users.map(user => {
                to = user.email;
                const msg = { to, from, subject, text };
                sendEmail(msg);
            });
            sendRes(res, 200);
        } 
        else {
            const msg = { to, from, subject, text };
            sendEmail(msg);
            sendRes(res, 200);
        }
    } catch(error) {
        handleCatch(res, 500, error);
    }
});


module.exports = router;