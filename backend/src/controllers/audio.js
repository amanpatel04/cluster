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
            $project: {
                audios: 1,
            },
        },
    ]);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                AudioFiles[0].audios,
                'audio successfully uploaded'
            )
        );
});

export const getAudioById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;

    const audioFile = await File.findById(fileId);
    if (!audioFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Audio not found'));
    }
    return res
        .status(200)
        .sendFile(audioFile.path);
});

export const deleteAudioById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const audioFile = await File.findByIdAndDelete(new mongoose.Types.ObjectId(id));

    if (!audioFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Audio not found'));
    }

    await FileTable.updateOne(
        { _id: req.user.fileTable },
        { $pull: { audios: { $in: [id] } } }
    );

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.audioSize -= audioFile.size;
    await userInfo.save();

    removeFile(audioFile.path);
    
    return res
        .status(200)
        .json(new ApiResponse(200, {_id: id}, 'audio successfully deleted'));
});
