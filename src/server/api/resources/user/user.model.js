import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  local: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  google: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  instagram: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

export default mongoose.model('User', userSchema);
