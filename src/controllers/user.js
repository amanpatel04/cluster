const {asyncHandler} = require("../utils/asyncHandler");


const register = asyncHandler(async(req, res) => {
    console.log(req);
    res.status(201).json({message: "User registered"});
});

module.exports = { register };