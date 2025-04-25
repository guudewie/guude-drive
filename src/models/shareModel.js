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

const getSharedKey = async (folderId) => {
  const keyObject = await prisma.share.findUnique({
    select: { key: true },
    where: { folderId: folderId },
  });
  return keyObject.key;
};

module.exports = { addToShared, deleteDeprecatedShares, getSharedKey };
