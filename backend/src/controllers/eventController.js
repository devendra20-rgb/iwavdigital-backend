import Event from "../models/Event.js";

// ✅ CREATE Event
export const createEvent = async (req, res) => {
  try {
    const { name, date, description } = req.body;

    if (!name) return res.status(400).json({ ok: false, error: "Name is required" });

    const event = await Event.create({ name, date, description });

    res.json({ ok: true, event });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ LIST all Events
export const listEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ ok: true, events });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ UPDATE Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await Event.findByIdAndUpdate(id, data, { new: true });

    if (!updated) return res.status(404).json({ ok: false, error: "Event not found" });

    res.json({ ok: true, event: updated });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ DELETE Event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ ok: false, error: "Event not found" });

    res.json({ ok: true, msg: "Event deleted" });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
