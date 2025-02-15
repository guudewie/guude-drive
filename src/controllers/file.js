const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadFile = [
  upload.array("file", 3),
  asyncHandler(async (req, res, next) => {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    for (const file of req.files) {
      await fileModel.createFile(
        req.user.id,
        req.query.folderId,
        file.originalname,
        file.size,
        file.mimetype,
        file.path
      );
    }

    res.redirect("/");
  }),
];

module.exports = { uploadFile };
