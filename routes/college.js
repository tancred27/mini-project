// verify, events
const express = require("express");
const router = express.Router();

/**
 * @Route: /users/:id
 * method: GET
 * desc: get all users with given college ID
 */
router.get("/users/:id", (req, res) => {
    let id = req.params.id;
    res.send(`verified user: ${id}`);
});

/**
 * @Route: /verify/:id
 * method: GET
 * desc: verify a user with given ID as an alumnus
 */
router.get("/verify/:id", (req, res) => {
    let id = req.params.id;
    res.send(`verified user: ${id}`);
});

/**
 * @Route: /events/:id
 * method: GET
 * desc: get all events of a college with given ID
 */
router.get("/events/:id", (req, res) => {
    res.send("events of college");
});

/**
 * @Route: /events/:id
 * method: POST
 * desc: add a new event to given college ID
 */
router.post("/events/:id", (req, res) => {
    res.send("Inserted event");
});

/**
 * @Route: /events/:cid/:id
 * method: PUT
 * desc: edit an event with given ID
 */
 router.put("/events/:id", (req, res) => {
    res.send("Updated event");
});

/**
 * @Route: /events/:cid/:id
 * method: DELETE
 * desc: delete an event with given ID
 */
 router.delete("/events/:cid/:id", (req, res) => {
    res.send("Deleted event");
});

module.exports = router;