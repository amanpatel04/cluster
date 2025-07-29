import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import removeFile from '../middlewares/removeFile.js';

import File from '../models/files.js';
import FileTable from '../models/fileTable.js';
import UserInfo from '../models/userInfo.js';

import mongoose from 'mongoose';

export const getVideoByPage = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const VideoFiles = await FileTable.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user.fileTable),
            },
        },

        {
            $project: {
                videos: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                VideoFiles[0].videos,
                'Video successfully uploaded'
            )
        );
});

export const getVideoById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const videoFile = await File.findById(fileId);
    if (!videoFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Video not found'));
    }

    return res
    .status(200)
    .sendFile(videoFile.path);

});

export const deleteVideoById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    
    const deleteFile = await File.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    
    if (!deleteFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Video not found'));
    }
    
    await FileTable.updateOne(
        { _id: req.user.fileTable },
        { $pull: { videos: { $in: [id] } } }
    );

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.videoSize -= deleteFile.size;
    await userInfo.save();

    removeFile(deleteFile.path);

    return res
        .status(200)
        .json(new ApiResponse(200, {_id: id}, 'video successfully deleted'));
});
