// controllers/membership.controller.js
import UserMembership from "../models/UserMembership.model.js";

export const getMyMembership = async (req, res) => {
  const membership = await UserMembership.findOne({
    user: req.user.id,
    isActive: true,
    endDate: { $gt: new Date() }
  })
  .sort({ createdAt: -1 });

  res.json(membership);
};


