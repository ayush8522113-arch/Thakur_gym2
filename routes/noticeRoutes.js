const upload = require("../middleware/uploadMiddleware");

const express = require("express");
const router = express.Router();


const {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
  uploadNoticeMedia

} = require("../controllers/noticeController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");


router.post("/", protect, adminOnly, createNotice,);
router.get("/", getNotices);
router.put("/:id", protect, adminOnly, updateNotice);
router.delete("/:id", protect, adminOnly, deleteNotice);

router.post(
  "/",
  protect,
  adminOnly,
  createNotice
);

// MEDIA UPLOAD (SEPARATE STEP)
router.post(
  "/:id/media",
  protect,
  adminOnly,
  upload.array("media", 5),
  uploadNoticeMedia
);

// PUBLIC: get notices
router.get("/", getNotices);

// ADMIN: delete notice
router.delete("/:id", protect, adminOnly, deleteNotice);

module.exports = router;
