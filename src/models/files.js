const { mongoose, Schema } = require("mongoose");

const fileSchema = new Schema({
    url : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    size : {
        type: Number
    },
    type : {
        type: String,
        enum : ["image", "video", "audio", "other"],
        required: true,
        default: "other"
    }
}, { timestamps: true });

fileSchema.pre("save", async function(next) {
    this.url = this.name;
    console.log(this);
    next();
})

const File = mongoose.model("File", fileSchema);

module.exports = { File };