import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    provider: String,
    local: {
      email: {
        type: String,
        unique: true,
      },
      isVerified: { type: Boolean },
    },
    facebook: {
      name: String,
      email: {
        type: String,
        unique: true,
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
      isVerified: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
