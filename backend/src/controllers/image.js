import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import removeFile from '../middlewares/removeFile.js';

import File from '../models/files.js';
import FileTable from '../models/fileTable.js';
import UserInfo from '../models/userInfo.js';

import mongoose from 'mongoose';

export const getImageByPage = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
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

export const getImageById = asyncHandler(async (req, res) => {
    const imageId = req.params.id;
    const imageFile = await File.findById(imageId);
    if (!imageFile) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Image not found'));
    }
    return res
    .status(200)
    .sendFile(imageFile.path);
});

export const deleteImageById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    
    
    const deleteFile = await File.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    
    if (!deleteFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Image not found'));
    }
    
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
