const { Queue } = require("bullmq");
const connection = require("../config/redis");

const workflowQueue = new Queue(
  "workflow-execution",
  {
    connection,
  }
);

module.exports = workflowQueue;