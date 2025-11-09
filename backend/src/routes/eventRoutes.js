import { Router } from "express";
import {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = Router();

router.post("/", createEvent);
router.get("/", listEvents);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
