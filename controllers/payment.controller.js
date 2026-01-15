import crypto from "crypto";
import mongoose from "mongoose";
import razorpay from "../config/razorpay.js";

import Payment from "../models/Payment.model.js";
import User from "../models/User.js";
import UserMembership from "../models/UserMembership.model.js";

import generatePaymentSlip from "../utils/generatePaymentSlip.js";

/* ============================
   CREATE ORDER
============================ */
export const createOrder = async (req, res) => {
  try {
    const { membershipType, amount } = req.body;

    if (!membershipType || !amount) {
      return res.status(400).json({ message: "Missing data" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

    await Payment.create({
      user: req.user.id,
      membershipType,
      amount,
      razorpay: {
        orderId: order.id
      },
      status: "created"
    });

    res.json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

/* ============================
   VERIFY PAYMENT
============================ */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    await Payment.findOneAndUpdate(
      { "razorpay.orderId": razorpay_order_id },
      {
        status: "paid",
        razorpay: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature
        }
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

/* ============================
   ADMIN: GET PAID PAYMENTS
============================ */
export const getPendingMemberships = async (req, res) => {
  const payments = await Payment.find({ status: "paid" })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(payments);
};

/* ============================
   ADMIN: APPROVE MEMBERSHIP
============================ */
export const approveMembership = async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ message: "Invalid payment ID" });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status === "approved") {
      return res.status(400).json({ message: "Already approved" });
    }

    const startDate = new Date();
    const endDate = new Date(
      startDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    await UserMembership.create({
      user: payment.user,
      membershipType: payment.membershipType,
      startDate,
      endDate,
      paymentId: payment._id
    });

    payment.status = "approved";
    await payment.save();

    console.log("MEMBERSHIP CREATED WITH PAYMENT ID:", payment._id);

    res.json({ message: "Membership approved successfully" });
  } catch (err) {
    console.error("APPROVE MEMBERSHIP ERROR:", err);
    res.status(500).json({ message: "Approval failed" });
  }
};

/* ============================
   DOWNLOAD PAYMENT SLIP
============================ */
export const downloadPaymentSlip = async (req, res) => {
  const { paymentId } = req.params;

  console.log("SLIP PARAM RECEIVED 👉", paymentId);

  if (!mongoose.Types.ObjectId.isValid(paymentId)) {
    return res.status(400).json({ message: "Invalid payment ID" });
  }

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // User can download only their own slip
    if (
      req.user.role !== "admin" &&
      payment.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(payment.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    generatePaymentSlip(payment, user, res);
  } catch (err) {
    console.error("DOWNLOAD SLIP ERROR:", err);
    res.status(500).json({ message: "Failed to generate payment slip" });
  }
};
