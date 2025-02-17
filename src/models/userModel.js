const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (firstName, lastName, username, password) => {
  // create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      password,
    },
  });

  // create rootFolder
  const rootFolder = await prisma.folder.create({
    data: {
      name: `${user.id}root`,
      user: { connect: { id: user.id } },
    },
  });

  // link rootFolder back to user
  await prisma.user.update({
    where: { id: user.id },
    data: { rootFolderId: rootFolder.id },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const getUserRootFolder = async (userId) => {
  return await prisma.user.findUnique({
    where: { userId },
  });
};

module.exports = {
  createUser,
  findUserById,
  findUserByUsername,
  getUserRootFolder,
};
