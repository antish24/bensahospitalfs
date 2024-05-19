import mongoose from 'mongoose';

const {Schema} = mongoose;

const ScheduleSchema = new Schema ({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {type: String, required: true},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  description: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: null},
});

export default mongoose.models.Schedule ||
  mongoose.model ('Schedule', ScheduleSchema);
