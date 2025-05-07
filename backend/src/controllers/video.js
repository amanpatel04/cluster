import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import removeFile from '../middlewares/removeFile.js';
import File from '../models/files.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getVideoByPage = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const VideoFiles = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: 'files',
                localField: 'videos',
                foreignField: '_id',
                as: 'videosList',
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
                videosList: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                VideoFiles[0].videosList,
                'Video successfully uploaded'
            )
        );
});

export const getVideoById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const videoFile = await File.findById(fileId);
    if (!videoFile) {
        throw new ApiError(404, 'File not found');
    }
    return res
        .status(200)
        .json(new ApiResponse(200, videoFile, 'video successfully uploaded'));
});

export const deleteVideoById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const clientUser = req.user;
    const file = await File.findById(id);
    const user = await User.findById(clientUser._id);
    if (!file) {
        throw new ApiError(404, 'File not found');
    }
    removeFile(file.path);
    user.sizeUsed -= file.size;
    user.videos.pull(file._id);
    await user.save();
    await File.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'video successfully deleted'));
});
