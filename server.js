const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const PORT = config.get("PORT") || 4000;
const connectDB = require("./config/db");

connectDB();

// Global variables:
global.responses = {
    200: "Success!",
    403: "Request forbidden!",
    404: "Requested resource not found!",
    500: "Internal Server Error!"
};

global.sendRes = (res, code) => {
    res.status(code).json({ "msg": `${responses[code]}`});
};

global.handleCatch = (res, code, error) => {
    console.log(error.msg);
    sendRes(res, code);
};

// Use Middleware:
app.use(express.json({ extended: false }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Routes:
app.use("/api/auth", require("./routes/auth"));
app.use("/api/college", require("./routes/college"));
app.use("/api/user", require("./routes/user"));
app.use("/api/cdn", require("./routes/cdn"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
