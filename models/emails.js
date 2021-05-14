const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "college"
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("email", emailSchema);

