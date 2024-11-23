const {ApiResponse} = require("../utils/ApiResponse");
const {ApiError} = require("../utils/ApiError");
const {asyncHandler} = require("../utils/asyncHandler");
const { User } = require("../models/user");
const { File } = require("../models/files");

const uploadFile = asyncHandler( async (req, res) => {
    const clientFile = req.body;
    console.log(clientFile);
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(400, "Invalid requested user");
    }
    const file = await File.create(clientFile);
    if (!file) {
        throw new ApiError(400, "Something went wrong while uploading file");
    }
    user.files.push(file._id);
    await user.save();
    return res
    .status(200)
    .json(new ApiResponse(200, file, "File uploaded successfully"));
})

module.exports = {
    uploadFile
}
