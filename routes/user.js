const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

/**
 * @route GET /api/user/
 * @desc fetch data of logged in user
 */
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/user/:id
 * @desc fetch data of user with given id
 */
router.get('/:id', auth, async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
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
    
    // Build User Object:
    const userFields = {};
    if (email) userFields.email = email;
    if (company) userFields.company = company;
    if (info) userFields.info = info;
    if (password) userFields.type = password;
    try {
        user = await User.findByIdAndUpdate(user._id, { $set: userFields }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

module.exports = router;