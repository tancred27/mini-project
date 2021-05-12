// login, register
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    res.send("login route");
});

router.post("/register", (req, res) => {
    res.send("register route");
});

module.exports = router;

