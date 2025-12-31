import { updateUserStartDate } from "../controllers/userController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { deleteUser } from "../controllers/userController.js";

import express from "express";
const router = express.Router();


router.put(
  "/:id/update-date",
  protect,
  adminOnly,
  updateUserStartDate
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteUser
);


export default router;