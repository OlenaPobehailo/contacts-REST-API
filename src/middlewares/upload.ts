import multer from "multer";
import path from "path";
import { CustomRequest } from "../common/CustomRequest";
import { CustomFile } from "../common/CustomFile";

const projectRoot = path.resolve(__dirname, "..");

const tempDir = path.resolve(projectRoot, "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req: CustomRequest, file: CustomFile, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: multerConfig,
});
