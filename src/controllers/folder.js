const asyncHandler = require("express-async-handler");
const { getFolderOfFolder, createFolder } = require("../models/folderModel");
const formatFolderName = require("../lib/utils/formatFolderName");

const createNewFolder = asyncHandler(async (req, res, next) => {
  const parentFolderId = req.query.folderId;
  const siblingFolders = await getFolderOfFolder(parentFolderId);
  let newFolderName = req.body.name;

  // sanitize and format folder name if sibling folders exist
  // sibling { life, university }, name { life } -> newName {life (1)}
  if (siblingFolders.length) {
    newFolderName = formatFolderName(newFolderName, siblingFolders);
  }

  await createFolder(req.user.id, newFolderName, parentFolderId);

  return res.redirect(`/my-drive/${parentFolderId}`);
});

module.exports = { createNewFolder };
