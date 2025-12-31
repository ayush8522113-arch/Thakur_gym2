console.log("ADMIN STATS ROUTES LOADED");


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


import manualUserRoutes from "./routes/manualUserRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminStatsRoutes from "./routes/adminStatsRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";



dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
     origin: [
      "https://thakurgym.netlify.app",
      "http://192.168.0.118:3000",
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

app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

