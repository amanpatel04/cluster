import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import File from '../models/files.js';
import User from '../models/user.js';

export const uploadFile = asyncHandler(async (req, res) => {
    const clientFile = req.file;
    const clientUser = req.user;
    const user = await User.findById(clientUser._id);
    const file = await File.create(clientFile);
    if (!file) {
        throw new ApiError(400, 'Something went wrong while uploading file');
    }
    user.sizeUsed += file.size;
    const fileType = file.mimetype.split('/')[0];
    switch (fileType) {
        case 'image':
            user.images.push(file._id);
            break;
        case 'video':
            user.videos.push(file._id);
            break;
        case 'audio':
            user.audios.push(file._id);
            break;
        default:
            user.others.push(file._id);
            break;
    }
    await user.save();
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { files: clientFile.filename },
                'File uploaded successfully'
            )
        );
});
