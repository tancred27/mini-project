const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    venue: {
        type: String,
        required: true
    },
    link: {
        type: String
    }
});

mongoose.exports = mongoose.model("events", eventSchema);