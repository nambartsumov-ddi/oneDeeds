import mongoose from 'mongoose';

const { Schema } = mongoose;

const tokenSchema = new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  accessToken: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 18000 },
});

export default mongoose.model('Token', tokenSchema);
