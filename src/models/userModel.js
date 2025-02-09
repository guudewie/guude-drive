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

  return { user, rootFolder };
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

module.exports = { createUser, findUserById, findUserByUsername };
