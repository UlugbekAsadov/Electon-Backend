import { extname } from "path";
import { unlinkSync } from "fs";
import { body, validationResult } from "express-validator";

export const uploadImageValidator = [
  body("img")
    .custom((_, { req }) => {
      const ext = extname(req.file.originalname);
      if (ext == ".jpg" || ext == ".png") {
        return true;
      } else {
        unlinkSync(req.file.path);
        return false;
      }
    })
    .withMessage("Invalid file extension. Only JPG and PNG files are allowed."),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
