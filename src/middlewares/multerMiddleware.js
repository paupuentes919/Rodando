const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/avatars");
  },
  filename: function (req, file, cb) {
    let fileName = `user-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const uploadFile = multer({ storage: storage });

module.exports = uploadFile;
