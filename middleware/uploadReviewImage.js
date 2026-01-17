import multer from "multer";

/**
 * Cloudinary requires file in memory (buffer),
 * NOT stored on disk
 */
const storage = multer.memoryStorage();

const uploadReviewImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default uploadReviewImage;
