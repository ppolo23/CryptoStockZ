const multer = require("multer");
const config = require("../../config/config")

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.env.WEBAPP_STATIC_FILES_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-cryptostockz-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;