import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    verified: Boolean,
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    googleId: {
      type: String,
      unique: true,
    },
    googleToken: {
      accessToken: String,
      refreshToken: String,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    facebookToken: {
      accessToken: String,
      refreshToken: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);

// google: {
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// },
// instagram: {
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// },
