const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gym_notices",           // Cloudinary folder name
    resource_type: "auto",           // auto-detect image/video
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "mp4",
      "mov",
      "webm",
    ],
  },
});

// Multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

module.exports = upload;
