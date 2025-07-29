import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import File from '../models/files.js';
import FileTable from '../models/fileTable.js';
import UserInfo from '../models/userInfo.js';

export const uploadFile = asyncHandler(async (req, res) => {
    const clientFile = req.file;

    const fileTable = await FileTable.findById(req.user.fileTable);
    const userInfo = await UserInfo.findById(req.user.userInfo);
    const file = await File.create(clientFile);

    if (!file) {
        throw new ApiError(400, 'Something went wrong while uploading file');
    }

    const fileType = file.mimetype.split('/')[0];
    switch (fileType) {
        case 'image':
            fileTable.images.push(file._id);
            userInfo.imageSize += file.size;
            break;
        case 'video':
            fileTable.videos.push(file._id);
            userInfo.videoSize += file.size;
            break;
        case 'audio':
            fileTable.audios.push(file._id);
            userInfo.audioSize += file.size;
            break;
        default:
            fileTable.others.push(file._id);
            userInfo.otherSize += file.size;
            break;
    }

    userInfo.upload += file.size;

    if (userInfo.recentFiles.length >= 5) {
        userInfo.recentFiles.shift();
    }
    
    userInfo.recentFiles.push(file._id);

    await fileTable.save();
    await userInfo.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { id: file._id },
                'File successfully uploaded having id in data'
            )
        );
});
