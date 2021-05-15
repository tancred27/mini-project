const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// storage config
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, "/assets/"));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    } 
});

// multer config
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return cb(new Error('Only pdf format is allowed.'), false);
        }
        cb(null, true);
    }
});

/**
 * @route GET /cdn/:id 
 * @desc endpoint to fetch user pfp
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.sendFile(path.resolve(`/assets/${id}.jpg`), (err) => {
        if (err) console.log(err.message);
    });
});

/**
 * @route POST /cdn/:id
 * @desc endpoint to upload user pfp
 */
router.post("/:id", upload.single("file"), (req, res) => {
    const { id } = req.params;
    fs.readFile(`./assets/${req.file.originalname}`, (err, data) => {
        if (err) {
            console.log(err.message);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(500).send("NO WORK");
        }
        else {
            console.log(data);
            fs.rename(path.resolve(`./assets/${req.file.originalname}`), path.resolve(`/assets/${id}.pdf`), (err) => {
                if (err) console.log("err renaming file : ", err.message);
                else console.log("file renamed");
            });
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send("UPLOAD IS WORK");
        }
    });
});

module.exports = router;