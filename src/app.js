const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());

// Roter imports
const {router: usersRouter} = require("./routes/users");
const {router: imageRouter} = require("./routes/image");

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/images", imageRouter);


module.exports = { app };