// routes/membership.routes.js
import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getMyMembership } from "../controllers/membership.controller.js";

const router = express.Router();

router.get("/my", auth, getMyMembership);

export default router;
