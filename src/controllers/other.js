const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {otherCreate} = require("../db/other");

const otherUpload = asyncHandler(async(req, res) => {
    let other = {};
    other.url = req.file.path;
    other.size = req.file.size / 1024;
    other.title = req.file.filename;
    other.user = req.user.id;
    other.extension = req.file.mimetype;
    await otherCreate(other);
    res.status(200).json(new ApiResponse(200, {}, "other file saved"));
});

module.exports = { otherUpload };