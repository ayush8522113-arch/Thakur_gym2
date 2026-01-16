const Notice = require("../models/Notice");

/**
 * ============================
 * CREATE NOTICE (ADMIN)
 * Text-only notice creation
 * ============================
 */
exports.createNotice = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description required" });
    }

    const notice = await Notice.create({
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      noticeId: notice._id,
    });
  } catch (error) {
    console.error("Create notice error:", error);
    res.status(500).json({ message: "Failed to create notice" });
  }
};

/**
 * ============================
 * UPLOAD NOTICE MEDIA (ADMIN)
 * Cloudinary upload
 * ============================
 */
exports.uploadNoticeMedia = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedMedia = req.files.map((file) => ({
      url: file.path, // Cloudinary URL
      type: file.resource_type === "video" ? "video" : "image",
    }));

    // ✅ APPEND, DON'T OVERWRITE
    notice.media.push(...uploadedMedia);

    await notice.save();

    res.json({ success: true, media: notice.media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Media upload failed" });
  }
};

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error("Get notices error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * ============================
 * UPDATE NOTICE (ADMIN)
 * Text update only
 * ============================
 */
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({
      success: true,
      message: "Notice updated successfully",
      notice,
    });
  } catch (error) {
    console.error("Update notice error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * ============================
 * DELETE NOTICE (ADMIN)
 * ============================
 */
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Delete notice error:", error);
    res.status(500).json({ error: error.message });
  }
};
