const { Router } = require("express");

const { 
    get
} = require("../controllers/image");
const { auth } = require("../middlewares/auth");

const router = Router();

router.route("/get").get(auth, get);

module.exports = { router };

