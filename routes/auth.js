const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const config = require("config");
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
 * @route POST /auth/user/register
 * @desc endpoint for user to register
 */
router.post("/user/register", async (req, res) => {
    const { name, rollNumber, email, mobile, college, branch, dob, company, info, year, password } = req.body;
    console.log(name, rollNumber, email, mobile, college, branch, dob, company, info, year, password);
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "user with given email already exists!" });
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
                text: `Kindly activate your account by clicking on the link - http://localhost:5000/auth/user/activate/${doc.rollNumber}`
            };
            sendEmail(msg);
            res.status(200).json({ "msg": "registered successfully!" });
        }
    } catch(err) {
        console.log(err.message);
        res.status(500).send("internal server error");
    };
});

/**
 * @route POST /auth/user/login
 * @desc endpoint for user to login
 */
router.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ "msg": "user with given email does not exist!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.json({ "msg": "invalid credentials!" });
    }
    if(!user.activated) return res.json({ "msg": "account has not been activated yet, please check your email!"});
    res.status(200).json({ "msg": "login successful!", token: Buffer.from(user.email).toString('base64'), user });
});

/**
 * @route GET /user/activate/:rollNumber
 * @desc endpoint to activate user's account
 */
router.get("/user/activate/:rollNumber", async (req, res) => {
    const { rollNumber } = req.params;
    var user = await User.findOne({ rollNumber });
    if (!user) {
        return res.send("Invalid link");
    }
    try {
        user = await User.findOneAndUpdate({ rollNumber}, { $set: { activated: true } }, { new: true });
        res.status(200).send("Account activated, please head to login page");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error!");
    }
});

module.exports = router;