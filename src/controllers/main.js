const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const folderModel = require("../models/folderModel");
const formatDate = require("../lib/utils/formatTime");
const formatBytes = require("../lib/utils/formatBytes");
const getFolderPath = require("../lib/utils/getBreadCrumbz");
const formatFolderName = require("../lib/utils/formatFolderName");

const getMainPage = asyncHandler(async (req, res, next) => {
  // take root folder if url has no folderid param
  const folderId = req.params.folderId
    ? req.params.folderId
    : res.locals.currentUser.rootFolderId;

  // GET FOLDER CONTENTS
  const { childFolders, File } = await folderModel.getFolderContents(
    folderId,
    req.user.id
  );

  const formattedFiles = File.map((item) => ({
    ...item,
    updatedAt: formatDate(item.updatedAt),
    size: formatBytes(item.size),
  }));

  const formattedFolders = childFolders.map((item) => ({
    ...item,
    updatedAt: formatDate(item.updatedAt),
  }));

  const formattedContent = [...formattedFiles, ...formattedFolders];

  // GET BREADCRUMZ
  const breadcrumbz = await getFolderPath(folderId);

  res.render("./partials/main", {
    layout: "./layout",
    folderId, // current folder id
    content: formattedContent,
    breadcrumbz: breadcrumbz,
  });
});

const updateContent = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  const type = req.query.type;
  const userId = req.user.id;
  const parentFolderId = req.body.folderId;
  let newName = req.body.name;

  if (type == "folder") {
    // format name before updating
    const siblingFolders = await folderModel.getFolderOfFolder();
    newName = formatFolderName(newName, siblingFolders);
    await folderModel.updateFolder(userId, itemId, newName);
  } else {
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
  res.redirect(`/my-drive/${parentFolderId}`);
});

module.exports = { getMainPage, updateContent, deleteContent };
