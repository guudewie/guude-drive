const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFolder = async (userId, name, folderId) => {
  return prisma.folder.create({
    data: {
      userId,
      name,
      folderId,
    },
  });
};

const getFolderContents = async (folderId, userId = null) => {
  // Create a base query object
  const whereCondition = { id: folderId };

  // Only add userId to the query if it's provided
  if (userId !== null) {
    whereCondition.userId = userId;
  }

  const contents = await prisma.folder.findUnique({
    where: whereCondition,
    include: {
      childFolders: {
        include: {
          shareId: true,
        },
      },
      File: true,
      shareId: true,
    },
  });

  // user/folder combi not found
  if (!contents) {
    const customError = new Error("Folder not found");
    customError.statusCode = 404;
    throw customError;
  }

  return contents;
};

const getFolderOfFolder = async (parentFolderId, userId) => {
  return prisma.folder.findMany({
    where: {
      folderId: parentFolderId,
      userId: userId,
    },
    include: {
      shareId: true,
    },
  });
};

const getParentFolder = async (folderId) => {
  const folder = await prisma.folder.findUnique({
    where: { id: folderId },
    include: { parentFolder: true },
  });

  if (!folder.parentFolder) return null;

  const parent = await prisma.folder.findUnique({
    where: { id: folder.parentFolder.id },
    include: { shareId: true, parentFolder: true },
  });

  return { id: parent.id, key: parent.shareId.key };
};

const updateFolder = async (userId, folderId, name) => {
  return prisma.folder.update({
    where: { id: folderId, userId: userId },
    data: { name },
  });
};

const deleteFolder = async (folderId, userId) => {
  return prisma.folder.delete({
    where: { id: folderId, userId },
  });
};

const getIsShared = async (folderId, userId) => {
  const folder = await prisma.folder.findUnique({
    where: { id: folderId, userId: userId },
    select: {
      shareId: true,
    },
  });
  // double ! to convert null to bollean
  return !!folder?.shareId;
};

const getSubFoldersRec = async (folderId, userId) => {
  const folders = await getFolderOfFolder(folderId, userId);

  let allSubFolders = [...folders];

  // For each subfolder, recursively get ALL of its nested subfolders
  for (const folder of folders) {
    const subFolders = await getSubFoldersRec(folder.id, userId);
    allSubFolders = [...allSubFolders, ...subFolders];
  }

  return allSubFolders;
};

module.exports = {
  createFolder,
  getFolderContents,
  getFolderOfFolder,
  getParentFolder,
  updateFolder,
  deleteFolder,
  getIsShared,
  getSubFoldersRec,
};
