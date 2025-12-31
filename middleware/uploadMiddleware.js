const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads/notices";

// 🔴 CRITICAL: Ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + `${Date.now()}-${file.originalname}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|PNG|webp|gif|mp4|mov|webm/;

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb("Only images and videos allowed");
};

const upload = multer({
  storage,
   limits: { fileSize: 50 * 1024 * 1024 }, 
});

fs.mkdirSync(uploadPath, { recursive: true });


module.exports = upload;
