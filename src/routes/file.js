const { Router } = require("express");
const { uploadFile } = require("../controllers/file");
const { upload } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

router = Router();

router.route("/uploadFile").post(auth, upload.single("file"), uploadFile);

module.exports = { router };