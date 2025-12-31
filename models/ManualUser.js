import mongoose from "mongoose";

const manualUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: String,
    email: String,
    startDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ManualUser", manualUserSchema);
