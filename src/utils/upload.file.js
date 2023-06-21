import { extname } from "path";
import multer from "multer";
import { accessSync, constants } from "fs";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },

  filename: function (req, file, cb) {
    const ext = extname(file.originalname);
    const date = new Date().getTime();
    file.originalname = "image-" + date + ext;
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

export function checkFileExists(filePath) {
  try {
    accessSync(filePath, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}
