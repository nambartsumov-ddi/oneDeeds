import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    local: {
      email: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
      },
      isVerified: { type: Boolean, default: false },
    },
    facebook: {
      name: String,
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
