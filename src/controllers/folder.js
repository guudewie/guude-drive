const asyncHandler = require("express-async-handler");
const {
  getFolderOfFolder,
  createFolder,
  getIsShared,
  getSubFoldersRec,
} = require("../models/folderModel");
const { addToShared, removeShared } = require("../models/shareModel");
const formatFolderName = require("../lib/utils/formatFolderName");
const { add } = require("date-fns");

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

const shareFolder = asyncHandler(async (req, res, next) => {
  const folderId = req.params.folderId;
  const userId = req.user.id;
  const time = req.body.time;
  const cascade = req.body.cascade;

  // check if folder is already shared
  const isShared = await getIsShared(folderId, userId);
  if (isShared)
    return res.status(404).json({ message: "folder already shared" });

  const validUntil = add(new Date(), {
    months: time == "MONTH" ? 1 : 0,
    weeks: time == "WEEK" ? 1 : 0,
    days: time == "DAY" ? 1 : 0,
    hours: time == "HOUR" ? 1 : 0,
  });

  // share base folder
  const shared = await addToShared(folderId, validUntil);
  const baseUrl = "http://localhost:3000/";
  const shareLink =
    baseUrl + `shared-drive/${shared.folderId}?key=${shared.key}`;

  // set variable to true, so that view in main knows to open sharemodal
  req.session.openShareModal = true;

  if (!cascade) {
    return res.redirect(`/my-drive/${folderId}`);
  }

  // share all sub folders
  const allSubFolders = await getSubFoldersRec(folderId, userId);
  allSubFolders
    .filter((folder) => folder.shareId == null)
    .forEach(async (folder) => {
      await addToShared(folder.id, validUntil);
    });

  res.redirect(`/my-drive/${folderId}`);
});

const removeFromShared = asyncHandler(async (req, res, next) => {
  const folderId = req.params.folderId;
  const userId = req.user.id;

  // remove curr folder
  await removeShared(folderId);

  // remove subfolders
  const allSubFolders = await getSubFoldersRec(folderId, userId, true);
  console.log(allSubFolders);
  allSubFolders
    .filter((folder) => folder.shareId != null)
    .forEach(async (folder) => {
      await removeShared(folder.id);
    });

  res.redirect(`/my-drive/${folderId}`);
});

module.exports = { createNewFolder, shareFolder, removeFromShared };
