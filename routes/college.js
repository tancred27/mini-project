const express = require("express");
const router = express.Router();
const College = require("../models/college");
const User = require("../models/user");
const Event = require("../models/events");
const auth = require("../middleware/auth");

/**
 * @route GET /api/college/
 * @desc fetch data of logged in college
 */
router.get('/', auth, async(req, res) => {
    try {
        let college = await College.findById(req.user.id).select("-password");
        if (!college) {
            console.log("error finding college");
            return res.status(404).json({ "msg": "College not found!" });
        }
        college = await college.populate("events").execPopulate();
        res.status(200).json(college);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/college/list
 * @desc fetch list of all colleges
 */
router.get('/list', async(req, res) => {
    try {
        const colleges = await College.find().select("-password");
        if (!colleges) {
            console.log("error finding colleges");
            return res.status(404).json({ "msg": "Colleges not found!" });
        }
        res.status(200).json(colleges);
    } catch (error) {
        handleCatch(res, 500, error);
    }
});


/**
 * @route GET /api/college/users
 * @desc get users of logged in college
 */
router.get("/users", auth, async(req, res) => {
    const id = req.user.id;
    try {
        const college = await College.findById(id);
        if (!college) {
            console.log("error finding college");
            return res.status(404).json({ "msg": "College not found!" });
        }
        const users = await User.find({ college: id, verified: false, activated: true });
        res.status(200).json(users);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/college/alumni
 * @desc get alumni of logged in college
 */
router.get("/alumni", auth, async(req, res) => {
    const id = req.user.id;
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
 * @route GET /api/college/verify/:id
 * @desc verify a user with given ID as an alumnus
 */
router.get("/verify/:id", auth, async(req, res) => {
    const { id } = req.params;
    let user = await User.findById(id).select("-password");
    if (!user) {
        return res.status(404).json({ "msg": "User not found!" });
    }
    if (user.college != req.user.id) {
        return sendRes(res, 403);
    }
    try {
        user = await User.findByIdAndUpdate(id, { $set: { verified: true } }, { new: true });
        res.status(200).json(user);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route GET /api/college/events
 * @desc get all events of logged in college
 */
router.get("/events", auth, async(req, res) => {
    const id = req.user.id;
    try {
        let college = await (await College.findById(id)).populate("events").execPopulate();
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
 * @route GET /api/college/events/:id
 * @desc get event with given id of logged in college
 */
router.get("/events/:id", auth, async(req, res) => {
    const id = req.user.id;
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
 * @route POST /api/college/events
 * @desc add a new event to logged in college
 */
router.post("/events", auth, async(req, res) => {
    const id = req.user.id;
    const { name, description, date, venue, link } = sanitizeInput(req.body);
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
        res.status(200).json(event);
    }
    catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route PUT /api/college/events/:id
 * @desc edit an event with given ID
 */
 router.put("/events/:id", auth, async(req, res) => {
    const id = req.user.id;
    const eventId = req.params.id;
    const { name, description, date, venue, link } = sanitizeInput(req.body);
    try {
        let event = await Event.findById(eventId);
        if (!event) {
            console.log("error finding event");
            return res.status(404).json({ "msg": "Event not found!" });
        }
        if (event.college != id) {
            return sendRes(res, 403);
        }
        event = await Event.findByIdAndUpdate(eventId, { $set: {
            name, description, date, venue, link
        } }, { new: true });
        res.status(200).json(event);
    } catch(error) {
        handleCatch(res, 500, error);
    }
});

/**
 * @route DELETE /api/college/events/:id
 * @desc delete an event with given ID
 */
 router.delete("/events/:id", auth, async(req, res) => {
    const id = req.user.id;
    const eventId = req.params.id;
    try {
        let event = await Event.findById(eventId);
        if (!event) {
            console.log("error finding event");
            return res.status(404).json({ "msg": "Event not found!" });
        }
        if (event.college != id) {
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