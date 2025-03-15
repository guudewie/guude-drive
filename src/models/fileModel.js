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

const getFileById = async (fileId, userId) => {
  const file = await prisma.file.findUnique({
    where: { id: fileId, userId },
  });

  // user/file combi not found
  if (!file) {
    const customError = new Error("File not found");
    customError.statusCode = 404;
    throw customError;
  }

  return file;
};

const getFilesOfFolder = async (parentFolderId, userId) => {
  return prisma.file.findMany({
    where: {
      folderId: parentFolderId,
      userId: userId,
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
    where: { id: fileId, userId },
  });
};

module.exports = {
  createFile,
  getFileById,
  getFilesOfFolder,
  updateFile,
  deleteFile,
};
