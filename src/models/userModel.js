const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (data) => {
  return await prisma.user.create({ data });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: `${id}` },
  });
};

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

module.exports = { createUser, findUserById, findUserByUsername };
