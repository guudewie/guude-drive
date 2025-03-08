const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const multer = require("multer");
const { fi } = require("date-fns/locale");
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

    res.redirect(`/my-drive/${req.query.folderId}`);
  }),
];

const downloadFile = asyncHandler(async (req, res, next) => {
  const file = await fileModel.getFileById(req.params.fileId, req.user.id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  console.log(file);

  res.download(file.storageUrl, file.name, (err) => {
    if (err) {
      return next(err);
    }
  });
});

module.exports = { uploadFile, downloadFile };
