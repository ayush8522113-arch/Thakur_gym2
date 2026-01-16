const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    // Cloudinary fields
    mediaUrl: {
      type: String, // full Cloudinary URL
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);

