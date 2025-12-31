import express from "express";
import {
  createManualUser,
  getManualUsers,
  deleteManualUser,
   updateManualUserDate,
} from "../controllers/manualUserController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getManualUsers);
router.post("/", protect, adminOnly, createManualUser);
router.delete("/:id", protect, adminOnly, deleteManualUser);
router.put("/:id/update-date", protect, adminOnly, updateManualUserDate);

export default router;
