const Notice = require("../models/Notice");

// CREATE NOTICE (ADMIN)
// noticeController.js

exports.uploadNoticeMedia = async (req, res) => {


  const notice = await Notice.findById(req.params.id);
  if (!notice) {
    return res.status(404).json({ message: "Notice not found" });
  }

  const files = req.files.map((file) => ({
    type: file.mimetype.startsWith("video") ? "video" : "image",
    url: `/uploads/${file.filename}`,
  }));

  notice.media.push(...files);
  await notice.save();

  res.json({ success: true });
};



exports.createNotice = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
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
};


// GET ALL NOTICES (PUBLIC)
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE NOTICE (ADMIN)
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
      message: "Notice updated successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE NOTICE (ADMIN)
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

