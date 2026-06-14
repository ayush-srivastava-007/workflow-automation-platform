const { Worker } = require("bullmq");
const connection = require("../config/redis");

const executionRepository = require(
  "../modules/execution/execution.repository"
);

const worker = new Worker(
  "workflow-execution",
  async (job) => {
    const { workflowId, payload } = job.data;

    console.log(
      `🚀 Executing Workflow ${workflowId}`
    );

    await executionRepository.createExecutionLog({
      workflowId,
      status: "SUCCESS",
      payload,
    });

    console.log(
      `✅ Workflow ${workflowId} executed`
    );
  },
  {
    connection,
  }
);

worker.on("failed", (job, err) => {
  console.error(
    `❌ Job ${job.id} failed`,
    err
  );
});

module.exports = worker;