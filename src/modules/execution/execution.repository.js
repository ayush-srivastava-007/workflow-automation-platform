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

module.exports = {
  createExecutionLog,
  updateExecutionLog,
};