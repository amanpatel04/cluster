const {Router} = require("express");
const {register, login} = require("../controllers/user");
const {upload} = require("../middlewares/multer");

const router = Router();

router.route("/register").post(upload.single("profile") ,register);
router.route("/login").post(login);


module.exports = {router};