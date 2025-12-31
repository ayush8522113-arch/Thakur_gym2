import express from "express";

import{
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


import { protect } from "../middleware/authMiddleware.js";
import {adminOnly} from "../middleware/adminMiddleware.js";
import User from "../models/User.js";

router.get("/", protect, adminOnly, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

export default router;