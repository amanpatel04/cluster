import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import removeFile from '../middlewares/removeFile.js';

import File from '../models/files.js';
import FileTable from '../models/fileTable.js';
import UserInfo from '../models/userInfo.js';

import mongoose from 'mongoose';

export const getAudioByPage = asyncHandler(async (req, res) => {
    const AudioFiles = await FileTable.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user.fileTable),
            },
        },
        {
            $lookup: {
                from: 'files',
                localField: 'audios',
                foreignField: '_id',
                as: 'audiosList',
            },
        },
        
        {
            $project: {
                audiosList: {
                    _id: 1,
                    size: 1,
                    originalname: 1,
                    mimetype: 1,
                    createdAt: 1
                },
                
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

export const getAudioMetaDataById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const audioFile = await File.findById(fileId).select('originalname size mimetype createdAt');
    if (!audioFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Audio not found'));
    }
    if (!audioFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, audioFile, 'Audio successfully uploaded'));
});

export const getAudioById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;

    const audioFile = await File.findById(fileId);
    if (!audioFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Audio not found'));
    }
    if (!audioFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.download += audioFile.size;

    await userInfo.save();
    
    return res
        .status(200)
        .sendFile(audioFile.path);
});

export const deleteAudioById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    
    const deleteFile = await File.findById(id).select('allowedUsers size path');

    if (!deleteFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Audio not found'));
    }
    
    if (!deleteFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }
    
    await File.deleteOne({ _id: id });
    
    await FileTable.updateOne(
        { _id: req.user.fileTable },
        { $pull: { audios: { $in: [id] } } }
    );

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.audioSize -= deleteFile.size;
    await userInfo.save();

    removeFile(deleteFile.path);
    
    return res
        .status(200)
        .json(new ApiResponse(200, {_id: id}, 'audio successfully deleted'));
});
