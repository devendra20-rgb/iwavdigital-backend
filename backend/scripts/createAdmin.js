import bcrypt from "bcryptjs";
import User from "../src/models/User.js";
import "../src/config/db.js";

const createAdmin = async () => {
  try {
    const hash = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@iwave.com",
      password: hash,
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
