import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { uploadGallery, getGallery, deleteImage } from "../controllers/galleryController.js";

const router = Router();

// ensure uploads folder exists
const galleryPath = path.resolve("uploads/gallery");
if (!fs.existsSync(galleryPath)) fs.mkdirSync(galleryPath, { recursive: true });

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/gallery");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// routes
router.post("/", upload.array("images", 10), uploadGallery);
router.get("/", getGallery);
router.delete("/:id", deleteImage);

export default router;
