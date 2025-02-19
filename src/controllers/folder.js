const asyncHandler = require("express-async-handler");
const folderModel = require("../models/folderModel");

const createNewFolder = asyncHandler(async (req, res, next) => {
  const parentFolderId = req.query.folderId;

  await folderModel.createFolder(req.user.id, req.body.name, parentFolderId);

  return res.redirect(`/my-drive/${parentFolderId}`);
});

module.exports = { createNewFolder };
