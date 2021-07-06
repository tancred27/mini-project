const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const config = require("config");
const PORT = config.get("PORT") || 4000;
const connectDB = require("./config/db");
const sanitize = require("mongo-sanitize");

connectDB();

// Global variables:
global.responses = {
    200: "Success!",
    403: "Request forbidden!",
    404: "Requested resource not found!",
    500: "Internal Server Error!"
};

// Global functions:
global.sendRes = (res, code) => {
    res.status(code).json({ "msg": `${responses[code]}`});
};

global.handleCatch = (res, code, error) => {
    console.log(error.message);
    sendRes(res, code);
};

// Sanitize input
global.sanitizeInput = (input) => {
    for(const key in input) {
        input[key] = sanitize(input[key]);
    }
    return input;
};

// Use Middleware:
app.use(morgan("combined"));
app.use(express.json({ extended: false }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Routes:
app.use("/api/auth", require("./routes/auth"));
app.use("/api/college", require("./routes/college"));
app.use("/api/user", require("./routes/user"));
app.use("/api/cdn", require("./routes/cdn"));

// Serve static assets in production:
if (process.env.NODE_ENV === "production") {
    // Set static folder:
    app.use(express.static("/client/build"));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
