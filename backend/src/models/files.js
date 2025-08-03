import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema(
    {
        originalname: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
        },
        filename: {
            type: String,
        },
        path: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
        },
        allowedUsers: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

export default File;
