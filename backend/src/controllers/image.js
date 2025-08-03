import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import removeFile from '../middlewares/removeFile.js';

import File from '../models/files.js';
import FileTable from '../models/fileTable.js';
import UserInfo from '../models/userInfo.js';

import mongoose from 'mongoose';

export const getImageByPage = asyncHandler(async (req, res) => {
    const ImageFiles = await FileTable.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user.fileTable),
            },
        },
        {
            $project: {
                images: 1, // Efficient pagination on array
            },
        }
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                ImageFiles[0].images,
                'image successfully uploaded'
            )
        );
});

export const getImageMetaDataById = asyncHandler(async (req, res) =>{
    const imageId = req.params.id;
    const imageFile = await File.findById(imageId).select('originalname size mimetype createdAt allowedUsers');
    if (!imageFile) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Image not found'));
    }
    if (!imageFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }
    return res
    .status(200)
    .json(new ApiResponse(200, imageFile, 'image successfully uploaded'));
});

export const getImageById = asyncHandler(async (req, res) => {
    const imageId = req.params.id;
    const imageFile = await File.findById(imageId).select('path allowedUsers size');
    if (!imageFile) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Image not found'));
    }
    
    if (!imageFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.download += imageFile.size;

    await userInfo.save();

    return res
    .status(200)
    .sendFile(imageFile.path);
});

export const deleteImageById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    const deleteFile = await File.findById(id).select('allowedUsers size path');

    if (!deleteFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Image not found'));
    }
    
    if (!deleteFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }
    
    
    await File.deleteOne({ _id: id });
    
    
    await FileTable.updateOne(
        { _id: req.user.fileTable },
        { $pull: { images: { $in: [id] } } }
    );

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.imageSize -= deleteFile.size;
    await userInfo.save();

    removeFile(deleteFile.path);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Image deleted successfully'));
});
