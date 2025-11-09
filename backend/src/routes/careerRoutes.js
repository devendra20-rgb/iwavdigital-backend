import { Router } from "express";
import upload from "../middleware/upload.js";
import path from "path";

import {
  createCareer,
  listCareer,
  deleteCareer,
  updateCareer
} from "../controllers/careerController.js";
import fs from "fs";


const router = Router();

// ✅ Upload only PDF resumes
router.post(
  "/",
  (req, res, next) => {
    req.uploadFolder = path.join("uploads", "resumes");
    next();
  },
  upload.single("resume"),
  createCareer
);

router.get("/", listCareer);
router.delete("/:id", deleteCareer);
router.put("/:id", updateCareer);

router.get("/download/:filename", (req, res) => {
  const file = path.join("uploads/resumes", req.params.filename);

  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(file); // ✅ Force download
});

export default router;
