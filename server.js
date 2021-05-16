const express = require("express");
const app = express();
const config = require("config");
const PORT = config.get("PORT") || 4000;
const connectDB = require("./config/db");

connectDB();

global.cors = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res;
}

// Use Middleware:
app.use(express.json({ extended: false }));

// Routes:
app.use("/auth", require("./routes/auth"));
app.use("/college", require("./routes/college"));
app.use("/user", require("./routes/user"));
app.use("/cdn", require("./routes/cdn"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
