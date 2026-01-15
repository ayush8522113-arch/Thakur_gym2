const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    membershipType: {
      type: String,
      enum: ["gold", "silver", "bronze"],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String
    },

    status: {
      type: String,
      enum: ["created", "paid", "approved"],
      default: "created"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
