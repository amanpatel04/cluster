const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {
    audioCreate,
    getAudioById
} = require("../db/audio");

const audioUpload = asyncHandler(async(req, res) => {
    let audio = {};
    audio.url = req.file.path;
    audio.size = req.file.size;
    audio.title = req.file.filename;
    audio.user = req.user.id;
    audio.duration = 60;
    await audioCreate(audio);
    res.status(200).json(new ApiResponse(200, {}, "audio file saved"));
});

const audioGet = asyncHandler(async (req, res) =>{
    const audio = await getAudioById(req.user.id);
    return res
    .status(200)
    .json(new ApiResponse(200, audio, `All audio file of userId : ${req.user.id}`));
});

module.exports = { 
    audioUpload,
    audioGet
};