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

const deleteDeprecatedShares = async () => {
  return prisma.share.deleteMany({
    where: {
      validUntil: {
        lt: new Date(),
      },
    },
  });
};

module.exports = { addToShared, deleteDeprecatedShares };
