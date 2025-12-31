
import express from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.post("/", createContact);

// Admin
router.get("/", protect, adminOnly, getAllContacts);

export default router;
