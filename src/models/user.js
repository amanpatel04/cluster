const {mongoose, Schema} = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    firstName : {
        type: String
    },
    lastName : {
        type: String
    },
    profileImg : {
        type: String,
        default: "images/default.png"
    },
    password : {
        type: String,
        required: true
    },
    refreshToken : {
        type: String,
        default: null
    },
    sizeAllocated : {
        type: Number,
        default: 0
    },
    sizeUsed : {
        type: Number,
        default: 0
    },
    files : [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }]
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.genrateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.genrateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

const User = mongoose.model("User", userSchema);

module.exports = { User };