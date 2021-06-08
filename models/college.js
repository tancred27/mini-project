const mongoose = require("mongoose");

const collegeSchema = mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
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
    events: [
        { type: mongoose.Schema.Types.ObjectId, ref: "events", default: null }
    ],
    activated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("college", collegeSchema);