const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
  uploadNoticeMedia,
} = require("../controllers/noticeController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

/**
 * ============================
 * CREATE NOTICE (ADMIN)
 * ============================
 */
router.post("/", protect, adminOnly, createNotice);

/**
 * ============================
 * GET ALL NOTICES (PUBLIC)
 * ============================
 */
router.get("/", getNotices);

/**
 * ============================
 * UPDATE NOTICE (ADMIN)
 * ============================
 */
router.put("/:id", protect, adminOnly, updateNotice);

/**
 * ============================
 * DELETE NOTICE (ADMIN)
 * ============================
 */
router.delete("/:id", protect, adminOnly, deleteNotice);

/**
 * ============================
 * UPLOAD NOTICE MEDIA (ADMIN)
 * Cloudinary + Multer
 * ============================
 */
router.post(
  "/:id/upload",
  protect,
  adminOnly,
  upload.single("media"),
  uploadNoticeMedia
);

module.exports = router;

