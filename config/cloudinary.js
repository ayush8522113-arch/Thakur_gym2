const cloudinary = require("cloudinary").v2;
const cloudConfig = require("./cloudinary_env");

cloudinary.config({
  cloud_name: cloudConfig.cloud_name,
  api_key: cloudConfig.api_key,
  api_secret: cloudConfig.api_secret,
});

module.exports = cloudinary;

