const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFolder = async (userId, name, folderId) => {
  return await prisma.folder.create({
    data: {
      userId,
      name,
      folderId,
    },
  });
};

const getFolderContents = async (folderId, userId) => {
  return await prisma.folder.findUnique({
    where: {
      id: folderId,
      userId: userId,
    },
    include: {
      childFolders: true,
      File: true,
    },
  });
};

const getFolderOfFolder = async (parentFolderId) => {
  return await prisma.folder.findMany({
    where: {
      folderId: parentFolderId,
    },
  });
};

const updateFolder = async (userId, folderId, name) => {
  return await prisma.folder.update({
    where: { id: folderId, userId: userId },
    data: { name },
  });
};

const deleteFolder = async (folderId) => {
  return await prisma.folder.delete({
    where: { folderId },
  });
};

module.exports = {
  createFolder,
  getFolderContents,
  getFolderOfFolder,
  updateFolder,
  deleteFolder,
};
