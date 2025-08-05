import mongoose, { Schema } from "mongoose";

const EmailVerifySchema = new Schema({
  userInfo : {
    type: Schema.Types.ObjectId,
    ref: "UserInfo",
  },
  code: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const EmailVerify = mongoose.model("EmailVerify", EmailVerifySchema);

export default EmailVerify;