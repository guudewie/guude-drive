const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create folder
const createFolder = async (userId, name, folderId) => {
  return await prisma.folder.create({
    data: {
      userId,
      name,
      folderId,
    },
  });
};

// read folder of folder
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

// update folder ( name )
const updateFolder = async (folderId, name) => {
  return await prisma.folder.update({
    where: { folderId },
    data: { name },
  });
};

// delete folder
const deleteFolder = async (folderId) => {
  return await prisma.folder.delete({
    where: { folderId },
  });
};

module.exports = {
  createFolder,
  getFolderContents,
  updateFolder,
  deleteFolder,
};
