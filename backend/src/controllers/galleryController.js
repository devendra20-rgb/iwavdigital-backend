import Gallery from "../models/GalleryImage.js";
import fs from "fs";

export const uploadGallery = async (req, res) => {
  try {
    // check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // map uploaded file paths
    const imagePaths = req.files.map((file) => `/uploads/gallery/${file.filename}`);
    const tag = req.body.tag || "";

    // create new gallery entry
    const newGallery = new Gallery({ images: imagePaths, tag });
    await newGallery.save();

    res.status(200).json({
      success: true,
      message: "Images uploaded and saved to database successfully",
      gallery: newGallery,
    });
  } catch (error) {
    console.error("❌ Error uploading gallery:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all gallery images
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ _id: -1 });
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a gallery item
export const deleteImage = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Image not found" });

    // Delete actual files from folder
    gallery.images.forEach((imgPath) => {
      const fullPath = `.${imgPath}`;
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });

    await gallery.deleteOne();
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
