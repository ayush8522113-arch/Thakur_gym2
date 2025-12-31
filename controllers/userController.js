import User from "../models/User.js";


export const updateUserStartDate = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { startDate: new Date() },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
};
