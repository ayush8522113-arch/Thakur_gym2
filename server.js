console.log("ADMIN STATS ROUTES LOADED");

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import membershipExpiryJob from "./cron/membershipExpiry.cron.js";


import manualUserRoutes from "./routes/manualUserRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminStatsRoutes from "./routes/adminStatsRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import paymentRoutes from "./routes/payment.routes.js";
import membershipRoutes from "./routes/membership.routes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

connectDB();

const app = express();

app.use(
  cors({
     origin: [
      "https://thakur-gym.vercel.app",
       "https://thakurgym.com",
      "https://www.thakurgym.com",

      
    ], // frontend
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/manual-users", manualUserRoutes); 

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", authRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/reviews", reviewRoutes);


membershipExpiryJob();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

