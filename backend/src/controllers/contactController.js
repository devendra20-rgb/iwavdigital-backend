import Contact from "../models/Contact.js";

// ✅ CREATE Contact
export const createContact = async (req, res) => {
  try {
    const { fullName, email, company, message } = req.body;

    if (!fullName || !email || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    const doc = await Contact.create({
      fullName,
      email,
      company,
      message,
    });

    res.json({ ok: true, contact: doc });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ GET ALL Contacts
export const getContacts = async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });
    res.json({ ok: true, contacts: data });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ GET Single Contact
export const getContactById = async (req, res) => {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ ok: false, error: "Contact not found" });

    res.json({ ok: true, contact: doc });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ DELETE Contact
export const deleteContact = async (req, res) => {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ ok: false, error: "Contact not found" });

    await doc.deleteOne();

    res.json({ ok: true, msg: "Contact deleted" });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// ✅ UPDATE Contact
export const updateContact = async (req, res) => {
  try {
    const { fullName, email, company, message } = req.body;

    const doc = await Contact.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ ok: false, error: "Contact not found" });

    doc.fullName = fullName || doc.fullName;
    doc.email = email || doc.email;
    doc.company = company || doc.company;
    doc.message = message || doc.message;

    await doc.save();

    res.json({ ok: true, contact: doc });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
