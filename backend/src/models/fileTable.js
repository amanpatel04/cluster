import mongoose, { Schema } from "mongoose";

const fileTableSchema = new Schema(
    {
        images: [
            {
                type: Schema.Types.ObjectId,
                ref: "File",
            },
        
        ],
        audios: [
            {
                type: Schema.Types.ObjectId,
                ref: "File",
            },
        ],
        videos: [
            {
                type: Schema.Types.ObjectId,
                ref: "File",
            },
        ],
        others: [
            {
                type: Schema.Types.ObjectId,
                ref: "File",
            },
        ],
    },
    { timestamps: true }
);

const FileTable = mongoose.model("FileTable", fileTableSchema);

export default FileTable;
