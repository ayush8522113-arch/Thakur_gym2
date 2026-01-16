const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gym_notices",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4"],
    resource_type: "auto",
  },
});

const upload = multer({ storage });

module.exports = upload;
