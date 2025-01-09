const { Router } = require("express");
const { uploadFile,
    deleteFile
 } = require("../controllers/file");
const { upload } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

router = Router();

router.route("/uploadFile").post(auth, upload.single("file"), uploadFile);
router.route("/deleteFile/:id").delete(auth, deleteFile);

module.exports = { router };