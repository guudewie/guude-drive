const asyncHandler = require("express-async-handler");
const fileModel = require("../models/fileModel");
const folderModel = require("../models/folderModel");
const formatDate = require("../lib/utils/formatTime");
const formatBytes = require("../lib/utils/formatBytes");

const getMainPage = asyncHandler(async (req, res, next) => {
  // take root folder if url has no folderid param
  const folderId = req.params.folderId
    ? req.params.folderId
    : res.locals.currentUser.rootFolderId;

  const { childFolders, File } = await folderModel.getFolderContents(
    folderId,
    req.user.id
  );

  const formattedContent = [...File, ...childFolders].map((item) => {
    return {
      ...item,
      updatedAt: formatDate(item.updatedAt),
      size: formatBytes(item.size),
    };
  });

  console.log(formattedContent);

  // somehow authenticate, that a user can only access his own files

  res.render("./partials/main", {
    layout: "./layout",
    folderId,
    content: formattedContent,
  });
});

module.exports = { getMainPage };
