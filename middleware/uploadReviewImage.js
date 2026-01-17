import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/reviews",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadReviewImage = multer({ storage });

export default uploadReviewImage;