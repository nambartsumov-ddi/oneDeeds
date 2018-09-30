import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    local: {
      email: {
        type: String,
        require: true,
        unique: true,
        index: true,
        sparse: true,
      },
      isVerified: { type: Boolean },
    },
    facebook: {
      name: String,
      email: {
        type: String,
        require: true,
        unique: true,
        index: true,
        sparse: true,
      },
      facebookId: {
        type: String,
        unique: true,
      },
      facebookToken: {
        accessToken: String,
        refreshToken: String,
      },
      isVerified: Boolean,
    },
    google: {
      name: String,
      email: {
        type: String,
        require: true,
        unique: true,
        index: true,
        sparse: true,
      },
      googleId: {
        type: String,
        unique: true,
      },
      googleToken: {
        accessToken: String,
        refreshToken: String,
      },
      isVerified: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
