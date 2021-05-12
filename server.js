const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const connectDB = require("./config/db");

connectDB();

// Use Middleware:
app.use(express.json({ extended: false }));

// Routes:
app.use("/auth", require("./routes/auth"));
app.use("/college", require("./routes/college"));
app.use("/user", require("./routes/user"));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


