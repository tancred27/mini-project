const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const PORT = config.get("PORT") || 4000;
const connectDB = require("./config/db");

connectDB();

// Use Middleware:
app.use(express.json({ extended: false }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Routes:
app.use("/auth", require("./routes/auth"));
app.use("/college", require("./routes/college"));
app.use("/user", require("./routes/user"));
app.use("/cdn", require("./routes/cdn"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
