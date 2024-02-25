const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { getFieldById } = require("../db/user");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async(req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        throw new ApiError(401, "invalid or not login");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await getFieldById("*", decodeToken._id);
    delete user.password, user.refresh_token;
    if (!user) {
        throw new ApiError(410, "invalid token value");
    }
    req.user = user;
    next();
});

module.exports = { auth };