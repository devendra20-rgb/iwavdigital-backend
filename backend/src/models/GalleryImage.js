import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  images: {
    type: [String], // multiple image URLs or paths
    required: true,
  },
  tag: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Gallery", gallerySchema);
