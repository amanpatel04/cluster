import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import removeFile from '../middlewares/removeFile.js';
import File from '../models/files.js';
import FileTable from '../models/fileTable.js';
import UserInfo from '../models/userInfo.js';
import mongoose from 'mongoose';

export const getOtherByPage = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const otherFiles = await FileTable.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user.fileTable),
            },
        },
        {
            $lookup: {
                from: 'files',
                localField: 'others',
                foreignField: '_id',
                as: 'othersList',
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
                othersList: {
                    _id: 1,
                    size: 1,
                    path: 1,
                    originalname: 1,
                }
            },
        },
    ]);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                otherFiles[0].othersList,
                'Other page successfully fetched'
            )
        );
});

export const getOtherById = asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    const otherFile = await File.findById(fileId).select('originalname path size mimetype createdAt allowedUsers');

    if (!otherFile) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Other not found'));
    }
    if (!otherFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.download += otherFile.size;
    await userInfo.save();

    return res
        .status(200)
        .sendFile(otherFile.path);
});

export const deleteOtherById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    const deleteFile = await File.findById(id).select('allowedUsers size path');

    if (!deleteFile) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, 'Other not found'));
    }
    
    if (!deleteFile.allowedUsers.equals(req.user._id)) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, 'Privacy : Invalid user'));
    }
    
    await File.deleteOne({ _id: id });
    
    await FileTable.updateOne(
        { _id: req.user.fileTable },
        { $pull: { others: { $in: [id] } } }
    );

    const userInfo = await UserInfo.findById(req.user.userInfo);
    userInfo.otherSize -= deleteFile.size;
    await userInfo.save();

    removeFile(deleteFile.path);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Other successfully deleted'));
});
