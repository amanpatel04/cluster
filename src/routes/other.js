const { Router } = require("express");

const { auth } = require("../middlewares/auth");

const router = Router();

// router.route("/upload").post(auth, upload.single("other"), otherUpload);

module.exports = { router }