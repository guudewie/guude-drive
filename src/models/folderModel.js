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

const getFolderContents = async (folderId, userId) => {
  return prisma.folder.findUnique({
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
  return prisma.folder.findMany({
    where: {
      folderId: parentFolderId,
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
  // const files = await prisma.file.deleteMany({
  //   where: { folderId, userId },
  // });

  // const folders = await prisma.folder.deleteMany({
  //   where: { folderId, userId },
  // });

  const items = await prisma.folder.delete({
    where: { id: folderId, userId },
  });

  console.log(items);
};

module.exports = {
  createFolder,
  getFolderContents,
  getFolderOfFolder,
  updateFolder,
  deleteFolder,
};
