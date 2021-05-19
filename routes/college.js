// verify, events
const express = require("express");
const router = express.Router();
const College = require("../models/college");
const User = require("../models/user");
const Event = require("../models/event");
const auth = require("../middleware/auth");

/**
 * @route GET /college/
 * @desc fetch data of logged in college
 */
router.get('/', auth, async(req, res) => {
    try {
        const college = await (await College.findById(req.college.id).select('-password')).populate("events");
        res.status(200).json(college);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /college/:id
 * @desc fetch data of college with given id
 */
router.get('/:id', auth, async(req, res) => {
    try {
        const college = await (await College.findById(req.params.id).select('-password')).populate("events");
        res.status(200).json(college);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /college/users
 * @desc get all users of logged in college
 */
router.get("/users", auth, async(req, res) => {
    const id = req.user;
    try {
        const college = await College.findById(id);
        if (!college) {
            console.log("error finding college");
            return res.status(404).json({ "msg": "College not found!" });
        }
        const users = await User.find({ college: college._id, verified: false, activated: true });
        res.status(200).json(users);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /college/alumni
 * @desc get all alumni of logged in college
 */
router.get("/users", auth, async(req, res) => {
    const id = req.user;
    try {
        const college = await College.findById(id);
        if (!college) {
            console.log("error finding college");
            return res.status(404).json({ "msg": "College not found!" });
        }
        const alumni = await User.find({ college: college._id, verified: true, activated: true });
        res.status(200).json(alumni);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /college/verify/:id
 * @desc verify a user with given ID as an alumnus
 */
router.get("/verify/:id", auth, async(req, res) => {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ "msg": "User not found!" });
    }
    if (user.college !== req.user) {
        return sendRes(res, 403);
    }
    try {
        user = await User.findByIdAndUpdate(id, { $set: { activated: true } }, { new: true });
        res.json({"msg": "user verified!"});
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /college/events
 * @desc get all events of logged in college
 */
router.get("/events", auth, async(req, res) => {
    const id = req.user;
    try {
        let college = await (await College.findById(id)).populate("events");
        if (!college) {
            console.log("error finding college");
            return res.status(404).json({ "msg": "College not found!" });
        }
        res.status(200).json({ "events": college.events });
    }
    catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /college/events/:id
 * @desc get event with given id of logged in college
 */
router.get("/events/:id", auth, async(req, res) => {
    const id = req.user;
    let eventId = req.params.id;
    try {
        let event = await Event.findById(eventId);
        if (!event) {
            console.log("error finding event");
            return res.status(404).json({ "msg": "Event not found!" });
        }
        if(event.college !== id) {
            return res.status(403).json({ "msg": "Request Forbidden!" });
        }
        res.status(200).json(event);
    }
    catch(error) {
        handleCatch(res, 500, error);
    }
});


/**
 * @route POST /college/events
 * @desc add a new event to logged in college
 */
router.post("/events", auth, async(req, res) => {
    const id = req.user;
    const { name, description, date, venue, link } = req.body; 
    try {
        let college = await College.findById(id);
        if (!college) {
            console.log("error finding college");
            return res.status(404).json({ "msg": "College not found" });
        }
        let events = college.events;
        let event = new Event({
            name, description, date, venue, link, college: id
        });
        await event.save();
        events.push(event._id);
        college = await College.findOneAndUpdate(id, { $set: { events } }, { new: true });
        sendRes(res, 200);
    }
    catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route PUT /college/events/:id
 * @desc edit an event with given ID
 */
 router.put("/events/:id", auth, async(req, res) => {
    const id = req.user;
    const eventId = req.params.id;
    const { name, description, date, venue, link } = req.body; 
    try {
        let event = await Event.findById(eventId);
        if (!event) {
            console.log("error finding event");
            return res.status(404).json({ "msg": "Event not found!" });
        }
        if (event.college !== id) {
            return sendRes(res, 403);
        }
        await event.findByIdAndUpdate(eventId, { $set: {
            name, description, date, venue, link
        } }, { new: true });
        sendRes(res, 200);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route DELETE /college/events/:id
 * @desc delete an event with given ID
 */
 router.delete("/events/:id", auth, (req, res) => {
    const id = req.user;
    const eventId = req.params.id;
    try {
        let event = await Event.findById(eventId);
        if (!event) {
            console.log("error finding event");
            return res.status(404).json({ "msg": "Event not found!" });
        }
        if (event.college !== id) {
            return sendRes(res, 403);
        }
        let college = await College.findById(id);
        if (!college) {
            console.log("error finding college");
            return sendRes(res, 500);
        }
        let events = college.events;
        events.filter((event) => event !== eventId);
        college = await College.findOneAndUpdate(id, { $set: { events } }, { new: true });
        await Event.deleteOne({ _id: eventId });
        sendRes(res, 200);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

module.exports = router;