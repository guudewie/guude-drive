const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addToShared = async (folderId, validUntil) => {
  return prisma.share.create({
    data: {
      folderId,
      validUntil,
    },
  });
};

module.exports = { addToShared };
