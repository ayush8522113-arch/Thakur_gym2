import mongoose from "mongoose";

const userMembershipSchema = new mongoose.Schema(
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

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    // ✅ ADD IT HERE (INSIDE THE OBJECT)
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "UserMembership",
  userMembershipSchema
);
