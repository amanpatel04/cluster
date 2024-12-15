const { Router } = require("express");

const { upload } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

const router = Router();


module.exports = { router }