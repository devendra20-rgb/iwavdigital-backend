import Career from "../models/Career.js";
import fs from "fs";
import path from "path";

// ✅ CREATE
export const createCareer = async (req, res) => {
  try {
    const { fullName, email, position, message } = req.body;

    if (!fullName || !email || !position) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // ✅ Allow only PDF
    if (req.file && !req.file.mimetype.includes("pdf")) {
      return res.status(400).json({ ok: false, error: "Only PDF allowed" });
    }

    const resumePath = req.file
      ? "/uploads/resumes/" + req.file.filename
      : null;

    const doc = await Career.create({
      fullName,
      email,
      position,
      message,
      resumePath,
    });

    res.json({ ok: true, career: doc });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ LIST ALL
export const listCareer = async (req, res) => {
  try {
    const list = await Career.find().sort({ createdAt: -1 });
    res.json({ ok: true, careers: list });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ UPDATE
export const updateCareer = async (req, res) => {
  try {
    const updated = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, career: updated });

  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ DELETE
export const deleteCareer = async (req, res) => {
  try {
    const item = await Career.findById(req.params.id);

    if (!item) return res.status(404).json({ ok: false, error: "Not found" });

    // Remove uploaded PDF
    if (item.resumePath) {
      const file = item.resumePath.replace("/uploads/", "uploads/");
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }

    await item.deleteOne();
    res.json({ ok: true, msg: "Deleted" });

  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
