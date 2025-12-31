import ManualUser from "../models/ManualUser.js";

export const getManualUsers = async (req, res) => {
  const users = await ManualUser.find().sort({ createdAt: -1 });
  res.json(users);
};

export const createManualUser = async (req, res) => {
  const { name, phone, email } = req.body;

  const user = await ManualUser.create({
    name,
    phone,
    email,
  });

  res.status(201).json(user);
};


export const deleteManualUser = async (req, res) => {
  await ManualUser.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

export const updateManualUserDate = async (req, res) => {
  const user = await ManualUser.findByIdAndUpdate(
    req.params.id,
    { startDate: new Date() },
    { new: true }
  );
  res.json(user);
};