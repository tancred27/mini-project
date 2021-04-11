const express = require("express");
const app = express();

app.get("/login", (req, res) => {
    console.log("Hi");
    res.send("bye");
});

app.use("/auth", require("./routes/auth"));
app.use("/college", require("./routes/college"));
app.use("/user", require("./routes/user"));

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


