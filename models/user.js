const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
        default: Date.now()
    },
    company: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    pfp: {
        type: Boolean
    },
    activated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("user", userSchema);