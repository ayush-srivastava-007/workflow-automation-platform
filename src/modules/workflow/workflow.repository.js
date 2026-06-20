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

const findWorkflowsByTriggerType = async (
  triggerType
) => {
  return prisma.workflow.findMany({
    where: {
      triggerType,
      isActive: true,
    },
  });
};

const updateWorkflow = async (id, data) => {
  return prisma.workflow.update({
    where: {
      id,
    },
    data,
  });
};

const deleteWorkflow = async (id) => {
  return prisma.workflow.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createWorkflow,
  findWorkflowsByUserId,
  findWorkflowById,
  findWorkflowsByTriggerType,
  updateWorkflow,
  deleteWorkflow,
};
