const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {imageCreate} = require("../db/image");

const imageUpload = asyncHandler(async(req, res) => {
    let image = {};
    image.url = req.file.path;
    image.size = req.file.size;
    image.title = req.file.filename;
    image.user = req.user.id;
    await imageCreate(image);
    res.status(200).json(new ApiResponse(200, {}, "File saved"));
});

module.exports = { imageUpload };