const {Router} = require("express");

const {auth} = require("../middlewares/auth");
const {upload} = require("../middlewares/multer");
const {videoUpload} = require("../controllers/video");

const router = Router();

router.route("/upload").post(auth, upload.single("video"), videoUpload);

module.exports = { router };