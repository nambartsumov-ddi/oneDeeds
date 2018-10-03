import mongoose from 'mongoose';
import { isEmail } from 'validator';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, 'invalid email'],
    },
    isVerified: { type: Boolean },
    provider: {
      type: String,
      enum: ['local', 'facebook', 'google'],
      required: true,
    },
    facebook: {
      facebookId: {
        type: String,
        unique: true,
      },
      facebookToken: {
        accessToken: String,
        refreshToken: String,
      },
    },
    google: {
      googleId: {
        type: String,
        unique: true,
      },
      googleToken: {
        accessToken: String,
        refreshToken: String,
      },
    },
  },
  { timestamps: true }
);

// UserSchema.path('provider').validate((value) => {
//   return !!value.length;
// }, 'Missing provider in UserSchema');

export default mongoose.model('User', UserSchema);
