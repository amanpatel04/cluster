import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import removeFile from '../middlewares/removeFile.js';
import File from '../models/files.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getAudioByPage = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const AudioFiles = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: 'files',
                localField: 'audios',
                foreignField: '_id',
                as: 'audiosList',
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
                audiosList: 1,
            },
        },
    ]);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                AudioFiles[0].audiosList,
                'audio successfully uploaded'
            )
        );
});

export const getAudioById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const audioFile = await File.findById(fileId);
    if (!audioFile) {
        throw new ApiError(404, 'File not found');
    }
    return res
        .status(200)
        .json(new ApiResponse(200, audioFile, 'audio successfully uploaded'));
});

export const deleteAudioById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const clientUser = req.user;
    const file = await File.findById(id);
    const user = await User.findById(clientUser._id);
    if (!file) {
        throw new ApiError(404, 'File not found');
    }
    removeFile(file.path);
    user.sizeUsed -= file.size;
    user.audios.pull(file._id);
    await user.save();
    await File.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'audio successfully deleted'));
});
