import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  date: Date,
  description: String
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
