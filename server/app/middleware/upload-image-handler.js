const multer = require("multer");

const uploadImageHandler = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/../../resources/uploads`,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-foto-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);

      return;
    }

    cb("Só envie imagens.", false);
  },
});

module.exports = uploadImageHandler;