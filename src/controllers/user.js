const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {ApiError} = require("../utils/ApiError");
const {insertUser, test, isExist, getField} = require("../db/users");
const bcrypt = require("bcrypt");


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
        user.profile = req.file.path.slice(7, req.file.path.length);
    } else {
        user.profile = "images/default.png"
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
    const re = await getField("username, password", user.username);

    if (await bcrypt.compare(user.password, re[0].password)) {
        console.log(`${re[0].username} password is correct.`);
        return res.status(201).json(new ApiResponse(200, user, "user login successful"));
    }
    throw new ApiError(400, "Password did not matched try again");

});

module.exports = { register, login };