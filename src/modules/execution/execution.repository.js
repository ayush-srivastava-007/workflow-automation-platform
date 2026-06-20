const prisma = require("../../config/prisma");

const createExecutionLog = async (data) => {
  return prisma.executionLog.create({
    data,
  });
};

const updateExecutionLog = async (id, data) => {
  return prisma.executionLog.update({
    where: { id },
    data,
  });
};

const getExecutions = async (userId) => {
  return prisma.executionLog.findMany({
    where: {
      workflow: {
        userId,
      },
    },

    include: {
      workflow: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      executedAt: "desc",
    },
  });
};

const getExecutionById = async (
  executionId,
  userId
) => {

  return prisma.executionLog.findFirst({

    where: {

      id: executionId,

      workflow: {
        userId,
      },

    },

    include: {

      workflow: {

        select: {

          id: true,

          name: true,

        },

      },

    },

  });

};

module.exports = {
  createExecutionLog,
  updateExecutionLog,
  getExecutions,
  getExecutionById,
};