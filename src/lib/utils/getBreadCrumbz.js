const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFolderPath = async (folderId) => {
  const path = [];
  let currentId = folderId;

  while (currentId) {
    const folder = await prisma.folder.findUnique({
      where: { id: currentId },
    });

    if (!folder) break;

    currentFolder = { id: folder.id, name: folder.name };
    path.unshift(currentFolder);
    currentId = folder.folderId; // set parent as id for next itr
  }

  return path;
};

module.exports = getFolderPath;
