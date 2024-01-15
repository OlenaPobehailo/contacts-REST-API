import multer from "multer";
import path from "path";
import { ICustomRequest } from "../interfaces/ICustomRequest";
import { ICustomFile } from "../interfaces/ICustomFile";

const projectRoot = path.resolve(__dirname, "..");

const tempDir = path.resolve(projectRoot, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req: ICustomRequest, file: ICustomFile, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: multerConfig,
});
