const prisma = require("../../config/prisma");

const createWorkflow = async (data) => {
  return prisma.workflow.create({
    data,
  });
};

const findWorkflowsByUserId = async (userId) => {
  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findWorkflowById = async (id, userId) => {
  return prisma.workflow.findFirst({
    where: {
      id,
      userId,
    },
  });
};

module.exports = {
  createWorkflow,
  findWorkflowsByUserId,
  findWorkflowById,
};
