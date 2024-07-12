const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {ApiError} = require("../utils/ApiError");
const {insertUser, isExist, getField, updateValue, getFieldById} = require("../db/user");
const {genrateAccessToken, genrateRefreshToken} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {options} = require("../constants");

const genrateToken = async (uid, user, email) => {
    const accessToken = genrateAccessToken(uid, user, email);
    const refreshToken = genrateRefreshToken(uid);
    await updateValue("refreshToken", refreshToken, uid);
    return {accessToken, refreshToken};
}

const register = asyncHandler(async (req, res) => {
    
    const user = req.body;
    for (const field in user) {
        if (user[field].trim() === "") {
            throw new ApiError(400, `${field} cannot be empty`);
        }
    }
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
    if (await isExist("username", user.username)) {
        throw new ApiError(409, "username already exist");
    }
    if (await isExist("email", user.email)) {
        throw new ApiError(409, "email already exist");
    }
    user.password = await bcrypt.hash(user.password, 10);
    const path = req.file?.path;
    if (path) {
        user.profileImg = req.file.path.slice(7, req.file.path.length);
    } else {
        user.profileImg = "images/default.png"
    }
    if (!user.sizeAllocated) {
        user.sizeAllocated = 0
    }
    await insertUser(user);
    delete user.password;
    res.status(201).json(new ApiResponse(200, user, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
    const user = req.body;
    for (const field in user) {
        if (user[field].trim() === "") {
            throw new ApiError(400, `${field} cannot be empty`);
        }
    }
    user.username = user.username.toLowerCase();
    if (!await isExist("username", user.username))
    {
        throw new ApiError(400, `${user.username} do not found`);
    }
    const re = await getField("id, username, email, password", user.username);
    const record = re[0];
    if (await bcrypt.compare(user.password, record.password)) {
        console.log(`${re[0].username} password is correct.`);
        const {accessToken, refreshToken} = await genrateToken(record.id, record.username, record.email);
        return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {user : user, accessToken, refreshToken}, "user login successful"));
    }
    throw new ApiError(400, "Password did not matched try again");

});

const logout = asyncHandler(async (req, res) => {
    await updateValue("refreshToken", "NULL", req.user.id);
    return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const loginRenew = asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Something went wrong.");
    }
    const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await getFieldById("*", decodeToken._id);
    if (!user) {
        throw new ApiError(401, "Something went wrong");
    }
    if(token !== user.refresh_token) {
        throw new ApiError(401, "login with invalid key");
    }
    const {accessToken, refreshToken} = await genrateToken(user.id, user.username, user.email);
    delete user.refreshToken;
    return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {user: user, accessToken, refreshToken}, "login successful"));
});

const get = asyncHandler(async (req, res)=> {
    const user = req.user;
    return res
    .status(200)
    .json(new ApiResponse(200, user, `record of user with id : ${user.id}`));
});

module.exports = { register,
    login,
    logout,
    loginRenew,
    get
 };