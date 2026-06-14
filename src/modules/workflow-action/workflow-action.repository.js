const prisma = require("../../config/prisma");

const createAction = async (data) => {
  return prisma.workflowAction.create({
    data,
  });
};

const getWorkflowActions = async (workflowId) => {
  return prisma.workflowAction.findMany({
    where: {
      workflowId,
    },
    orderBy: {
      sequence: "asc",
    },
  });
};

module.exports = {
  createAction,
  getWorkflowActions,
};