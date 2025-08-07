import mongoose, { Schema } from 'mongoose';

const feedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    require: true
  },
  readed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
