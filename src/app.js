const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
}

// middelware
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions))

// Roter imports
const {router: usersRouter} = require("./routes/users");
const {router: imageRouter} = require("./routes/image");
const {router: audioRouter} = require("./routes/audio");
const {router: otherRouter} =  require("./routes/other");
const {router: videoRouter} = require("./routes/video");
const {router: fileRouter} = require("./routes/file");

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/audio", audioRouter);
app.use("/api/v1/other", otherRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/file", fileRouter);


module.exports = { app };
