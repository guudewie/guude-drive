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
  return await prisma.file.create({
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
  return await prisma.file.findMany({
    where: {
      AND: [{ folderId }, { userId }],
    },
  });
};

// update file ( name )
const updateFile = async (fileId, name) => {
  return await prisma.file.update({
    where: { fileId },
    data: { name },
  });
};

// delete file
const deleteFile = async (fileId) => {
  return await prisma.file.delete({
    where: { fileId },
  });
};

module.exports = { createFile, readFiles, updateFile, deleteFile };
