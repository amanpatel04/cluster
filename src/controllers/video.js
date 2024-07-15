const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {
    videoCreate,
    getVideoById
} = require("../db/video");

const videoUpload = asyncHandler(async(req, res) => {
    let video = {};
    video.url = req.file.path;
    video.size = req.file.size / 1024;
    video.title = req.file.filename;
    video.user = req.user.id;
    video.poster = "image/default.jpg";
    video.duration = 90;
    await videoCreate(video);
    res.status(200).json(new ApiResponse(200, {}, "File saved"));
});

const videoGet = asyncHandler(async (req, res) => {
    const video = await getVideoById(req.user.id);
    return res
    .status(200)
    .json(new ApiResponse(200, video, `All video file of userId : ${req.user.id}`));
});

module.exports = { 
    videoUpload,
    videoGet
};