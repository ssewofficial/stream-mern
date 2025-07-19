import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(path.resolve(), "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const timestamp = Date.now();
    const newFileName = `${baseName}-${timestamp}${ext}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });
export default upload;
