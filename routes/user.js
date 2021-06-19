const express = require("express");
const router = express.Router();
const User = require("../models/user");
const College = require("../models/college");
const auth = require("../middleware/auth");
const Event = require("../models/events");
const bcrypt = require("bcryptjs");

/**
 * @route GET /api/user/
 * @desc fetch data of logged in user
 */
router.get('/', auth, async(req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        user = await user.populate("college", "email").execPopulate();
        res.status(200).json(user);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/user/info/:id
 * @desc fetch data of user with given id
 */
router.get('/info/:id', auth, async(req, res) => {
    try {
        let user = await User.findById(req.params.id).select('-password');
        user = await user.populate("college", "collegeName").execPopulate();
        res.status(200).json(user);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/user/collegeInfo
 * @desc fetch contact info of college of logged in user
 */
router.get('/collegeInfo', auth, async(req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        let college = await College.findById(user.college);
        user = {
            _id: college._id,
            email: college.email,
            mobile: college.mobile
        }
        res.status(200).json(user);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/user/alumni
 * @desc fetch alumni of college of logged in user
 */
router.get("/college/:id", auth, async(req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if(!user.verified) {
            return res.status(403).json({ msg: "No permission!" });
        }
        let college = await College.findById(user.college);
        const alumni = await User.find({ college: college._id, verified: true, activated: true }).select("-password");
        res.status(200).json(alumni);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/user/alumni
 * @desc fetch alumni of college of logged in user
 */
router.get("/alumni", auth, async(req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if(!user.verified) {
            return res.status(403).json({ msg: "No permission!" });
        }
        let college = await College.findById(user.college);
        const alumni = await User.find({ college: college._id, verified: true, activated: true }).select("-password");
        res.status(200).json(alumni);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/user/events
 * @desc fetch events of college of logged in user
 */
router.get("/events", auth, async(req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if(!user.verified) {
            return res.status(403).json({ msg: "No permission!" });
        }
        const events = await Event.find({ college: user.college });
        res.status(200).json(events);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route PUT /api/user/
 * @desc update data of logged in user
 */
router.put("/", auth, async (req, res) => {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const { email, company, info, password } = sanitizeInput(req.body);
    if (user.email !== email && await User.find({ email })) {
       return res.status(400).json({ msg: "User with given email aready exists! "});
    }
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    // Build User Object:
    const userFields = {};
    if (email) userFields.email = email;
    if (company) userFields.company = company;
    if (info) userFields.info = info;
    if (password) userFields.password = pass;
    try {
        user = await User.findByIdAndUpdate(user._id, { $set: userFields }, { new: true }).select("-password");
        res.status(200).json({ user, msg: "Update Success!" });
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

module.exports = router;