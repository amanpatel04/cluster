import multer, { diskStorage } from "multer";

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.MEDIA_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

export default upload;
