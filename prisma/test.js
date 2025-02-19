const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const folderIdLvl2 = "01951ee6-2608-7543-9c0f-090825e9d31b";
const folderIdLvl3 = "01951ee6-4a6c-7911-a1b3-b3e1dfe68408";

const folderPath = async (folderId) => {
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
