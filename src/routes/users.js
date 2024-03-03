const {Router} = require("express");
const {register,
    login,
    logout,
    loginRenew,
    get
    } = require("../controllers/user");
const {upload} = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

const router = Router();

router.route("/register").post(upload.single("profile") ,register);
router.route("/login").post(login);
router.route("/logout").get(auth, logout);
router.route("/renew").get(loginRenew);
router.route("/get").get(auth, get);




module.exports = {router};