const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

const createFolder = async (userId, name, folderId) => {
  return prisma.folder.create({
    data: {
      userId,
      name,
      folderId,
    },
  });
};

const getFolderContents = async (folderId, userId) => {
  const contents = await prisma.folder.findUnique({
    where: {
      id: folderId,
      userId: userId,
    },
    include: {
      childFolders: true,
      File: true,
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
  });
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

module.exports = {
  createFolder,
  getFolderContents,
  getFolderOfFolder,
  updateFolder,
  deleteFolder,
};
