const { Router } = require("express");

const { imageUpload } = require("../controllers/image");
const { upload } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

const router = Router();

router.route("/upload").post(auth, upload.single("image"), imageUpload);

module.exports = { router };

