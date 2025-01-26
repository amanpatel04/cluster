import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new ApiError(401, 'invalid or not login');
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodeToken._id).select(
        '_id username email firstName lastName'
    );
    if (!user) {
        throw new ApiError(401, 'invalid token value');
    }
    req.user = user;
    next();
});

export default auth;
