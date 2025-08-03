import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import removeFile from '../middlewares/removeFile.js';

import File from '../models/files.js';
import FileTable from '../models/fileTable.js';
import UserInfo from '../models/userInfo.js';

import mongoose from 'mongoose';

export const getVideoByPage = asyncHandler(async (req, res) => {
    const VideoFiles = await FileTable.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user.fileTable),
            },
        },
        {
            $lookup: {
                from: 'files',
                localField: 'videos',
                foreignField: '_id',
                as: 'videosList',
            },
        },
        {
            $project: {
                videosList: {
                    _id: 1,
                    size: 1,
                    originalname: 1,
                    createdAt: 1,
                }
            },
        }

    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                VideoFiles[0].videosList,
                'Video list successfully fetched'
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

    if (!videoFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.download += videoFile.size;
    await userInfo.save();

    return res
    .status(200)
    .sendFile(videoFile.path);

});

export const getVideoMetaDataById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const videoFile = await File.findById(fileId).select('originalname size mimetype createdAt allowedUsers');
    if (!videoFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Video not found'));
    }
    if (!videoFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, videoFile, 'Video successfully uploaded'));
});

export const getPosterById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const posterFile = await File.findById(fileId).select('allowedUsers destination');
    
    if (!posterFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Poster not found'));
    }
    if (!posterFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }
    const posterPath = `${posterFile.destination}/poster/${posterFile._id}.webp`;
    return res
    .status(200)
    .sendFile(posterPath);
});

export const deleteVideoById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    const deleteFile = await File.findById(id).select('allowedUsers size path destination');

    if (!deleteFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Video not found'));
    }
    
    if (!deleteFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }
    
    await File.deleteOne({ _id: id });
    
    await FileTable.updateOne(
        { _id: req.user.fileTable },
        { $pull: { videos: { $in: [id] } } }
    );

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.videoSize -= deleteFile.size;
    await userInfo.save();

    removeFile(deleteFile.path);
    removeFile(`${deleteFile.destination}/poster/${deleteFile._id}.webp`);

    return res
        .status(200)
        .json(new ApiResponse(200, {_id: id}, 'video successfully deleted'));
});
