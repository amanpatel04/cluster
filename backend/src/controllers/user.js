import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendMail from "../utils/SendMail.js";

import User from "../models/user.js";
import UserInfo from "../models/userInfo.js";
import FileTable from "../models/fileTable.js";
import File from "../models/files.js";

import EmailVerify from "../models/emailVerify.js";

import options from "../constants.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const genrateToken = async (_id) => {
  try {
    const user = await User.findById(_id);
    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while genrating token : ", error);
  }
};

const generateEmailToken = async (_id, email) => {
  const code = parseInt(Math.random() * 1000000).toString();

  const emailVerify = await EmailVerify.create({ userInfo: _id, code: code });

  const token = jwt.sign(
    { _id: emailVerify._id, _verify: code },
    process.env.EMAIL_VERIFICATION_SECRET,
    { expiresIn: "15m" }
  )


  const link = `${process.env.BASE_URL}/verify/?token=${token}`;
  sendMail(email, "Email Verification From Fileorca", `Click on the link to verify your email : ${link}`);
  return token;
}

export const userRegister = asyncHandler(async (req, res) => {
  const user = req.body;
  for (const field in user) {
    if (user[field].trim() === "") {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, `${field} cannot be empty`));
    }
  }

  user.email = user.email.toLowerCase();
  if (await User.exists({ email: user.email })) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User already exists"));
  }

  const userInfo = await UserInfo.create({});
  const fileTable = await FileTable.create({});

  user.userInfo = userInfo._id;
  user.fileTable = fileTable._id;

  const newUser = await User.create(user);
  if (!newUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User registration failed"));
  }

  await generateEmailToken(userInfo._id, user.email);

  delete newUser.password;

  res.status(201).json(
    new ApiResponse(200, { "_id": newUser._id }, "User registered successfully")
  );
});

export const userVerify = asyncHandler(async (req, res) => {
  const token = req.query.token;
  const decodedToken = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);

  if (!decodedToken) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid token"));
  }

  const emailVerify = await EmailVerify.findById(decodedToken._id);

  if (!emailVerify) {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid token"));
  }

  if (emailVerify.code !== decodedToken._verify) {
    return res.status(400).json(new ApiResponse(400, {}, "Code does not match"));
  }

  await emailVerify.deleteOne();

  const userInfo = await UserInfo.findById(emailVerify.userInfo);

  if (!userInfo) {
    return res.status(400).json(new ApiResponse(400, {}, "Unable to find user info"));
  }

  userInfo.sizeAllocated = 10737418240;

  await userInfo.save();

  return res.status(200).json(new ApiResponse(200, {}, "User verified successfully"));
});

export const userResendLink = asyncHandler(async (req, res) => {
  await generateEmailToken(req.user.userInfo, req.user.email);
  return res.status(200).json(new ApiResponse(200, {}, "Email sent successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const client = req.body;
  for (const field in client) {
    if (client[field].trim() === "") {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, `${field} cannot be empty`));
    }
  }
  client.email = client.email.toLowerCase();
  let user = await User.findOne({ email: client.email });
  if (!user) {
    return res.status(400).json(new ApiResponse(400, {}, "User not found"));
  }

  if (await user.isPasswordCorrect(client.password)) {
    const { accessToken, refreshToken } = await genrateToken(user._id);
    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: user._id, accessToken, refreshToken },
          "user login successful"
        )
      );
  }

  return res
    .status(400)
    .json(new ApiResponse(400, {}, "Invalid credentials"));
});

export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

export const loginRenew = asyncHandler(async (req, res) => {
  const token =
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Refresh Token not found"));
  }
  const decodeToken = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decodeToken) => {
      if (error) {
        return res
          .status(400)
          .json(new ApiResponse(400, {}, "Refresh token is invalid"));
      } else {
        let user = await User.findById(decodeToken._id);
        if (!user) {
          return res
            .status(400)
            .json(new ApiResponse(400, {}, "User not found"));
        }
        if (token !== user.refreshToken) {
          return res
            .status(400)
            .json(
              new ApiResponse(
                400,
                {},
                "Refresh token did not matched"
              )
            );
        }
        const { accessToken, refreshToken } = await genrateToken(
          user._id
        );
        user = await User.findById(user._id).select(
          "-password -refreshToken"
        );
        return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(
            new ApiResponse(
              200,
              { user: user, accessToken, refreshToken },
              "login successful"
            )
          );
      }
    }
  );
});

export const getUserInfo = asyncHandler(async (req, res) => {
  const userInfo = await UserInfo.findById(req.user.userInfo);
  return res
    .status(200)
    .json(
      new ApiResponse(200, userInfo, `record of user with id : ${req.user._id}`)
    );
});

export const isLoggedIn = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "User is logged in"));
});

export const userDelete = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const userInfo = req.user.userInfo;
  const fileTable = req.user.fileTable;

  await User.findByIdAndDelete(id);
  await UserInfo.findByIdAndDelete(userInfo);
  await FileTable.findByIdAndDelete(fileTable);

  const objectId = new mongoose.Types.ObjectId(id);

  await File.deleteMany({ allowedUsers: objectId });

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});
