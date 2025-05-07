import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import removeFile from '../middlewares/removeFile.js';
import File from '../models/files.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getImageByPage = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const ImageFiles = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: 'files',
                localField: 'images',
                foreignField: '_id',
                as: 'imagesList',
                // pipeline: [
                //     {
                //         $skip: (page - 1) * 10,
                //     },
                //     {
                //         $limit: 10,
                //     },
                // ],
            },
        },
        {
            $project: {
                imagesList: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                ImageFiles[0].imagesList,
                'image successfully uploaded'
            )
        );
});

export const getImageById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    if (!file) {
        throw new ApiError(404, 'File not found');
    }
    const imageFile = await File.findById(fileId);
    if (imageFile.mimetype.split('/')[0] !== 'image') {
        throw new ApiError(404, 'File is not an image');
    }
    return res
        .status(200)
        .json(new ApiResponse(200, imageFile, 'image successfully uploaded'));
});

export const deleteImageById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const clientUser = req.user;
    const file = await File.findById(id);
    const user = await User.findById(clientUser._id);
    if (!file) {
        throw new ApiError(404, 'File not found');
    }
    removeFile(file.path);
    user.sizeUsed -= file.size;
    user.images.pull(file._id);
    await user.save();
    await File.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Image deleted successfully'));
});
