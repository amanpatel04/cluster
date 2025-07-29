import mongoose, { Schema } from "mongoose";

const userInfoSchema = new Schema(
    {
        cpuUsage: {
            type: Number,
            default: 0,
        },
        memoryUsage: {
            type: Number,
            default: 0,
        },
        upload: {
            type: Number,
            default: 0,
        },
        download: {
            type: Number,
            default: 0,
        },
        videoSize: {
            type: Number,
            default: 0,
        },
        imageSize: {
            type: Number,
            default: 0,
        },
        audioSize: {
            type: Number,
            default: 0,
        },
        otherSize: {
            type: Number,
            default: 0,
        },
        sizeAllocated: {
            type: Number,
            default: 1e10,
        },
        plan: {
            type: String,
            default: "free",
        },
        recentFiles: [
            {
                type: Schema.Types.ObjectId,
                ref: "File",
            },
        ],
    },
    { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
