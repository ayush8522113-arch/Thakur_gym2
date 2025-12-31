import User from"../models/User.js";
import ManualUser from "../models/ManualUser.js";
import Booking from "../models/Booking.js";
import Notice from "../models/Notice.js";


export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
      const manualUsersCount = await ManualUser.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    const totalNotices = await Notice.countDocuments();

    res.json({
      totalUsers,
      manualUsersCount,
      totalBookings,
      pendingBookings,
      totalNotices,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

