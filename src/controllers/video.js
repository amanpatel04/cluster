const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {videoCreate} = require("../db/video");

const videoUpload = asyncHandler(async(req, res) => {
    let video = {};
    video.url = req.file.path;
    video.size = req.file.size;
    video.title = req.file.filename;
    video.user = req.user.id;
    video.poster = "image/default.jpg";
    video.duration = 90;
    await videoCreate(video);
    res.status(200).json(new ApiResponse(200, {}, "File saved"));
});

module.exports = { videoUpload };