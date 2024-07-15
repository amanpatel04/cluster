const {asyncHandler} = require("../utils/asyncHandler");
const {ApiResponse} = require("../utils/ApiResponse");
const {imageCreate,
    getImageById        
} = require("../db/image");

const imageUpload = asyncHandler(async(req, res) => {
    console.log(req.user)
    let image = {};
    image.url = req.file.path;
    image.size = req.file.size / 1024;
    image.title = req.file.filename;
    image.user = req.user.id;
    await imageCreate(image);
    res.status(200).json(new ApiResponse(200, {}, "File saved"));
});

const get = asyncHandler(async (req, res) => {
    const image = await getImageById(req.user.id);
    return res
    .status(200)
    .json(new ApiResponse(200, image, `All image file of userId : ${req.user.id}`));
});

module.exports = { 
    imageUpload,
    get
};