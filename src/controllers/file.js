const {ApiResponse} = require("../utils/ApiResponse");
const {ApiError} = require("../utils/ApiError");
const {asyncHandler} = require("../utils/asyncHandler");
const { removeFile } = require("../middlewares/removeFile");
const { User } = require("../models/user");
const { File } = require("../models/files");

const uploadFile = asyncHandler( async (req, res) => {
    const clientFile = req.file;
    const clientUser = req.user;
    const file = await File.create(clientFile);
    if (!file) {
        throw new ApiError(400, "Something went wrong while uploading file");
    }
    const user = await User.findById(clientUser._id);
    user.sizeUsed += file.size;
    const fileType = file.mimetype.split("/")[0];
    switch (fileType) {
        case "image":
            user.images.push(file._id);
            break;
        case "video":
            user.videos.push(file._id);
            break;
        case "audio":
            user.audios.push(file._id);
            break;
        default:
            user.others.push(file._id);
            break;
    }
    await user.save();
    return res
    .status(200)
    .json(new ApiResponse(200, file, "File uploaded successfully"));
})

const deleteFile = asyncHandler( async (req, res) => {
    const id = req.params.id;
    const clientUser = req.user;
    const file = await File.findById(id);
    if (!file) {
        throw new ApiError(400, "File not found");
    }
    const user = await User.findById(clientUser._id);
    user.sizeUsed -= file.size;
    const fileType = file.mimetype.split("/")[0];
    switch (fileType) {
        case "image":
            user.images.pull(file._id);
            break;
        case "video":
            user.videos.pull(file._id);
            break;
        case "audio":
            user.audios.pull(file._id);
            break;
        default:
            user.others.pull(file._id);
            break;
    }
    await user.save();
    await File.findByIdAndDelete(id);
    removeFile(file.path);
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "File deleted successfully"));
})

module.exports = {
    uploadFile,
    deleteFile
}
