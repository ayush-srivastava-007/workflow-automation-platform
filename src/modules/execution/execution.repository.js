const prisma = require("../../config/prisma");

const createExecutionLog = async (data) => {
  return prisma.executionLog.create({
    data,
  });
};

module.exports = {
  createExecutionLog,
};