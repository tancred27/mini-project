// verify, events
const express = require("express");
const router = express.Router();
const College = require("../models/college");
const auth = require("../middleware/auth");

/**
 * @route GET /college/
 * @desc fetch data of logged in user
 */
router.get('/', auth, async(req, res) => {
    res = cors(res);
    try {
        const college = await College.findById(req.college.id).select('-password');
        res.json(college);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error!');
    }
});

/**
 * @route GET /college/users/:id
 * @desc get all users with given college ID
 */
router.get("/users/:id", auth, (req, res) => {
    res = cors(res);
    let id = req.params.id;
    res.send(`verified user: ${id}`);
});

/**
 * @route GET /college/verify/:id
 * @desc verify a user with given ID as an alumnus
 */
router.get("/verify/:id", auth, (req, res) => {
    res = cors(res);
    let id = req.params.id;
    res.send(`verified user: ${id}`);
});

/**
 * @route GET /college/events/:id
 * @desc get all events of a college with given ID
 */
router.get("/events/:id", auth, (req, res) => {
    res = cors(res);
    res.send("events of college");
});

/**
 * @route POST /college/events/:id
 * @desc add a new event to given college ID
 */
router.post("/events/:id", auth, (req, res) => {
    res = cors(res);
    res.send("Inserted event");
});

/**
 * @route PUT /college/events/:cid/:id
 * @desc edit an event with given ID
 */
 router.put("/events/:id", auth, (req, res) => {
    res = cors(res);
    res.send("Updated event");
});

/**
 * @route DELETE /college/events/:cid/:id
 * @desc delete an event with given ID
 */
 router.delete("/events/:cid/:id", auth, (req, res) => {
    res = cors(res);
    res.send("Deleted event");
});

module.exports = router;