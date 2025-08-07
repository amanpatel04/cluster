import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import Feedback from '../models/feedback.js'

export const setFeedback = asyncHandler(async (req, res) => {
  const message = req.body.message;
  const id = req.user._id;
  const feedback = await Feedback.create({
    'user': id,
    'message': message
  });

  if (!feedback) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, 'Unable to submit feedback'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { '_id': feedback._id }, 'feedback created with _id'));
});

export const getNewFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({ readed: false });

  await Feedback.updateMany({ readed: false }, { readed: true });

  return res
    .status(200)
    .json(new ApiResponse(200, feedback, 'List of unread field'));
});

export const getAllFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, feedback, 'All feedback'));
});
