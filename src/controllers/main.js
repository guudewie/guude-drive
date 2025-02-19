const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const folderModel = require("../models/folderModel");
const formatDate = require("../lib/utils/formatTime");
const formatBytes = require("../lib/utils/formatBytes");
const getFolderPath = require("../lib/utils/getBreadCrumbz");

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
    folderId,
    content: formattedContent,
    breadcrumbz: breadcrumbz,
  });
});

module.exports = { getMainPage };
