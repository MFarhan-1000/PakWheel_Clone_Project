
const cloudinary = require('cloudinary').v2
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRETKEY
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Cars_Pics',
    resource_type: 'auto',
    public_id: (req, file) => Date.now() + "-" ,
  },
});

const upload = multer({storage });
 
module.exports = upload;
