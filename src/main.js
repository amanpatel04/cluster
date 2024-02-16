const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res)=> {
    console.log(req.url);
    res.send("This is home page.");
})

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on ${process.env.PORT} ...`);
})