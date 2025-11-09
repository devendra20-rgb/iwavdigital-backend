import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/config/db.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import careerRoutes from "./src/routes/careerRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Static uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "iWaveDigital Backend Running ✅" });
});

const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ API running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error", err);
    process.exit(1);
  });
