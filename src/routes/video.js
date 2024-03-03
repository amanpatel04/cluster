const {Router} = require("express");

const {auth} = require("../middlewares/auth");
const {upload} = require("../middlewares/multer");
const {
    videoUpload,
    videoGet
} = require("../controllers/video");

const router = Router();

router.route("/upload").post(auth, upload.single("video"), videoUpload);
router.route("/get").get(auth, videoGet);

module.exports = { router };