const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
   deleteBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// USER: Create booking
router.post("/", protect, createBooking);

// ADMIN: View all bookings
router.get("/admin", protect, adminOnly, getAllBookings);

// ADMIN: Update booking status
router.put("/admin/:id", protect, adminOnly, updateBookingStatus);

router.delete("/admin/:id", protect, adminOnly, deleteBooking);


module.exports = router;

