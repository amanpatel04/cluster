const { Router } = require("express");

const { 
    imageUpload,
    get
} = require("../controllers/image");
const { upload } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

const router = Router();

router.route("/upload").post(auth, upload.single("image"), imageUpload);
router.route("/get").get(auth, get);

module.exports = { router };

