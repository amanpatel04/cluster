import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.js';
import options from '../constants.js';

const genrateToken = async (_id) => {
    try {
        const user = await User.findById(_id);
        const accessToken = user.genrateAccessToken();
        const refreshToken = user.genrateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken };
    } catch (error) {
        console.log('Error while genrating token : ', error);
    }
};

export const userRegister = asyncHandler(async (req, res) => {
    const user = req.body;
    for (const field in user) {
        if (user[field].trim() === '') {
            throw new ApiError(400, `${field} cannot be empty`);
        }
    }
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();

    const newUser = await User.create(req.body);
    if (!newUser) {
        throw new ApiError(400, 'Something went wrong while creating user');
    }

    delete newUser.password;
    res.status(201).json(
        new ApiResponse(200, newUser, 'User registered successfully')
    );
});

export const login = asyncHandler(async (req, res) => {
    const client = req.body;
    for (const field in client) {
        if (client[field].trim() === '') {
            throw new ApiError(400, `${field} cannot be empty`);
        }
    }
    client.email = client.email.toLowerCase();
    let user = await User.findOne({ email: client.email });
    if (!user) {
        throw new ApiError(400, `${user.email} do not found`);
    }

    if (await user.isPasswordCorrect(client.password)) {
        const { accessToken, refreshToken } = await genrateToken(user._id);
        user = await User.findById(user._id).select('-password -refreshToken');
        return res
            .status(201)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { user: user, accessToken, refreshToken },
                    'user login successful'
                )
            );
    }

    throw new ApiError(400, 'Password did not matched try again');
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
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, {}, 'User logged Out'));
});

export const loginRenew = asyncHandler(async (req, res) => {
    const token =
        req.cookies?.refreshToken ||
        req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new ApiError(401, 'Something went wrong.');
    }
    const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    let user = await User.findById(decodeToken._id);
    if (!user) {
        throw new ApiError(401, 'Something went wrong');
    }
    if (token !== user.refresh_token) {
        throw new ApiError(401, 'login with invalid key');
    }
    const { accessToken, refreshToken } = await genrateToken(user._id);
    user = await User.findById(user._id).select('-password -refreshToken');
    return res
        .status(201)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: user, accessToken, refreshToken },
                'login successful'
            )
        );
});

export const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res
        .status(200)
        .json(
            new ApiResponse(200, user, `record of user with id : ${user.id}`)
        );
});
