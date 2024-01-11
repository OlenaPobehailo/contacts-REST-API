"use strict";
const multer = require("multer");
const path = require("path");
const projectRoot = path.resolve(__dirname, "..");
const tempDir = path.resolve(projectRoot, "temp");
const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: multerConfig,
});
module.exports = upload;
