import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import auth from "../middleware/authMiddleware.js";
import {
  getPendingMemberships,
  approveMembership
} from "../controllers/payment.controller.js";
import admin from "../middleware/adminMiddleware.js";
import { downloadPaymentSlip } from "../controllers/payment.controller.js";



const router = express.Router();
console.log("auth:", typeof auth);
console.log("createOrder:", typeof createOrder);
console.log("verifyPayment:", typeof verifyPayment);
/* 🔎 END DEBUG */

router.post("/create-order", auth, createOrder);
router.post("/verify", auth, verifyPayment);

// Admin routes
router.get("/admin/pending", auth, admin, getPendingMemberships);
router.post("/admin/approve/:paymentId", auth, admin, approveMembership);



router.get(
  "/slip/:paymentId",
  auth,
  downloadPaymentSlip
);

export default router;
