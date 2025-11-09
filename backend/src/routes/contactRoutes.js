import { Router } from "express";
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
  updateContact,
} from "../controllers/contactController.js";

const router = Router();

// ✅ Create Contact
router.post("/", createContact);

// ✅ Get all contacts
router.get("/", getContacts);

// ✅ Get single contact
router.get("/:id", getContactById);

// ✅ Delete contact
router.delete("/:id", deleteContact);

// ✅ Update contact
router.put("/:id", updateContact);

export default router;
