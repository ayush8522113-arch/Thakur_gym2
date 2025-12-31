import Contact from "../models/Contact.js";

// Public: create contact message
export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    message,
  });

  res.status(201).json({ success: true });
};

// Admin: get all contact messages
export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};
