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
      required: true,
      validate: [isEmail, 'Invalid email'],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ['email', 'facebook', 'google'],
      required: true,
    },
    facebook: {
      facebookId: {
        type: String,
      },
      facebookToken: {
        accessToken: String,
        refreshToken: String,
      },
    },
    google: {
      googleId: {
        type: String,
      },
      googleToken: {
        accessToken: String,
        refreshToken: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
