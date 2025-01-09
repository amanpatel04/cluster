const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');
const { ApiError } = require('../utils/ApiError');
const { File } = require('../models/files');

const get = asyncHandler(async (req, res) => {
  const fileId = req.params.id;
  const file = await File.findById(fileId);
  if (!file) {
    throw new ApiError(400, 'File not found');
  }
  const imageFile = await File.findById(fileId);
  if (imageFile.mimetype.split('/')[0] !== 'image') {
    throw new ApiError(400, 'File is not an image');
  }
  return res
    .status(200)
    .json(new ApiResponse(200, imageFile, 'image successfully uploaded'));
});

module.exports = { get };
