const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const multer = require("multer");
const formatFileName = require("../lib/utils/formatFileName");
const upload = multer({ dest: "uploads/" });

const uploadFile = [
  upload.array("file", 3),
  asyncHandler(async (req, res, next) => {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const parentFolderId = req.query.folderId;
    const userId = req.user.id;
    const siblingsFiles = await fileModel.getFilesOfFolder(
      parentFolderId,
      userId
    );

    for (const file of req.files) {
      const formattedName = formatFileName(file.originalname, siblingsFiles);
      await fileModel.createFile(
        userId,
        parentFolderId,
        formattedName,
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

  res.download(file.storageUrl, file.name, (err) => {
    if (err) {
      return next(err);
    }
  });
});

module.exports = { uploadFile, downloadFile };
