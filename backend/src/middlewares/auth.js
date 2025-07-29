import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json(new ApiResponse(401, {}, "Access token not found"));
    }

    await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (error, decodedToken) => {
            if (error) {
                return res
                    .status(401)
                    .json(new ApiResponse(401, {}, "Access token is invalid"));
            }

            req.user = await User.findById(decodedToken._id);
            next();
        }
    );
});

export default auth;
