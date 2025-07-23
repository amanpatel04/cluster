import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res
        .status(401)
        .json({"message" : "Invalid refresh token"});
    }
    
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decodedToken) => {
        if (error) {
            return res
            .status(401)
            .json({"message" : "Access token expired or invalid token"});
        }

        req.user = await User.findById(decodedToken._id);
        next();
    });
});

export default auth;
