const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create file
const createFile = async (
  userId,
  folderId,
  name,
  size,
  mimeType,
  storageUrl
) => {
  return prisma.file.create({
    data: {
      userId,
      folderId,
      name,
      size,
      mimeType,
      storageUrl,
    },
  });
};

// read files of folder
const readFiles = async (folderId, userId) => {
  return prisma.file.findMany({
    where: {
      AND: [{ folderId }, { userId }],
    },
  });
};

// update file ( name )
const updateFile = async (userId, fileId, name) => {
  return prisma.file.update({
    where: { id: fileId, userId: userId },
    data: { name },
  });
};

// delete file
const deleteFile = async (fileId, userId) => {
  return prisma.file.delete({
    where: { fileId, userId },
  });
};

module.exports = { createFile, readFiles, updateFile, deleteFile };
