const { Router } = require("express");

const { audioUpload } = require("../controllers/audio");
const { upload } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

const router = Router();

router.route("/upload").post(auth, upload.single("audio"), audioUpload);

module.exports = { router }