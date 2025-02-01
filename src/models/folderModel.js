const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create folder
export const createFolder = async (userId, name, folderId) => {
  return await prisma.folder.create({
    data: {
      userId,
      name,
      folderId,
    },
  });
};

// read folder of folder
export const readFolder = async (folderId, userId) => {
  return await prisma.folder.findMany({
    where: {
      AND: [{ folderId }, { userId }],
    },
  });
};

// update folder ( name )
export const updateFolder = async (folderId, name) => {
  return await prisma.folder.update({
    where: { folderId },
    data: { name },
  });
};

// delete folder
export const deleteFolder = async (folderId) => {
  return await prisma.folder.delete({
    where: { folderId },
  });
};
