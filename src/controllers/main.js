const asyncHandler = require("express-async-handler");
const folderModel = require("../models/folderModel");
const formatDate = require("../lib/utils/formatTime");
const formatBytes = require("../lib/utils/formatBytes");
const getFolderPath = require("../lib/utils/getBreadCrumbz");
const { deleteDeprecatedShares } = require("../models/shareModel");

const getMainPage = asyncHandler(async (req, res, next) => {
  // take root folder if url has no folderid param
  const folderId = req.params.folderId
    ? req.params.folderId
    : res.locals.currentUser.rootFolderId;

  // get info from delete function -> pass variable on to view to render toast
  const tempDeleteSuccess = req.session.deleteSuccess;
  req.session.deleteSuccess = false;

  const tempOpenShareModal = req.session.openShareModal;
  req.session.openShareModal = false;

  // CLEAN UP SHARE MODEL
  await deleteDeprecatedShares();

  // GET FOLDER CONTENTS
  const { childFolders, File, shareId } = await folderModel.getFolderContents(
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

  // GET SHARELINK
  const shareLink = shareId
    ? `${process.env.BASE_URL}/shared-drive/${folderId}?key=${shareId.key}`
    : "";

  // GET BREADCRUMZ
  const breadcrumbz = await getFolderPath(folderId);

  res.render("./partials/main", {
    layout: "./layout",
    folderId, // current folder id
    content: formattedContent,
    breadcrumbz: breadcrumbz,
    deleteSuccess: tempDeleteSuccess,
    openShareModal: tempOpenShareModal,
    shareLink: shareLink,
  });
});

module.exports = { getMainPage };
