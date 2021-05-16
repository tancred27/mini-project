const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

/**
 * @route GET /user/
 * @desc fetch data of logged in user
 */
router.get('/', auth, async(req, res) => {
    res = cors(res);
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;