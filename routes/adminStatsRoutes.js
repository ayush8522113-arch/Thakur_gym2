import express from "express";
import { getAdminStats } from "../controllers/adminStatsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAdminStats);

console.log("ADMIN STATS ROUTE FILE EXECUTED");


export default router;
