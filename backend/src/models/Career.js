import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  resumePath: String,
  message: String
}, { timestamps: true });

export default mongoose.model('Career', CareerSchema);
