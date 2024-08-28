import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
   storage: storage ,
   limits: { fileSize: 200 * 1024 * 1024 },
  });

export default upload;
