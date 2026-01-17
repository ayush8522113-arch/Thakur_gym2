import express from "express";
import Review from "../models/Review.js";
import upload from "../middleware/uploadReviewImage.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import cloudinary from "../config/cloudinary.js";
const router = express.Router();
console.log("REVIEW ROUTES FILE LOADED");

router.get("/test", (req, res) => {
  res.send("REVIEWS ROUTE WORKING");
});

/**
 * @route POST /api/reviews
 * @desc  Add review (Cloudinary image)
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, rating, description, about } = req.body;

    if (!name || !rating || !description) {
      return res.status(400).json({
        message: "Name, rating and description are required",
      });
    }

    let imageUrl = "";

    // 🔥 Upload image to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "gym-reviews",
        }
      );

      imageUrl = result.secure_url;
    }

    const review = await Review.create({
      name,
      rating: Number(rating),
      description,
      about,
      image: imageUrl, // ✅ Cloudinary URL
      isApproved: true,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/reviews
 * @desc    Get all approved reviews
 */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/reviews/admin
 * @access  Admin
 */
router.get(
  "/admin",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * @route   PUT /api/reviews/:id/approve
 * @access  Admin
 */
router.put(
  "/:id/approve",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      review.isApproved = true;
      await review.save();

      res.json({ message: "Review approved" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * @route   DELETE /api/reviews/:id
 * @access  Admin
 */
router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      await review.deleteOne();
      res.json({ message: "Review deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
