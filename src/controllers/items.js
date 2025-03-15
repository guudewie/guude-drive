const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const folderModel = require("../models/folderModel");
const formatFolderName = require("../lib/utils/formatFolderName");
const formatFileName = require("../lib/utils/formatFileName");

const updateContent = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  const type = req.query.type;
  const userId = req.user.id;
  const parentFolderId = req.body.folderId;
  let newName = req.body.name;

  if (type == "folder") {
    // format name before updating
    const siblingFolders = await folderModel.getFolderOfFolder(
      parentFolderId,
      userId
    );
    newName = formatFolderName(newName, siblingFolders);
    await folderModel.updateFolder(userId, itemId, newName);
  } else {
    const siblingFiles = await fileModel.getFilesOfFolder(
      parentFolderId,
      userId
    );
    newName = formatFileName(newName, siblingFiles);
    await fileModel.updateFile(userId, itemId, newName);
  }

  res.redirect(`/my-drive/${parentFolderId}`);
});

const deleteContent = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  const type = req.query.type;
  const userId = req.user.id;
  const parentFolderId = req.body.folderId;

  if (type == "folder") {
    await folderModel.deleteFolder(itemId, userId);
  } else {
    await fileModel.deleteFile(itemId, userId);
  }

  // set session variable so that redirect route can pass variable on to view
  req.session.deleteSuccess = true;

  res.redirect(`/my-drive/${parentFolderId}`);
});

module.exports = { updateContent, deleteContent };
