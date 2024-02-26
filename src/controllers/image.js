const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");

const imageUpload = asyncHandler(async(req, res) => {
    console.log(req.user);
    console.log(req.file);
    res.status.json(new ApiResponse(200, {}, "File saved"));
});

module.exports = { imageUpload };