const { Worker } = require("bullmq");
const connection = require("../config/redis");

const executionRepository = require(
  "../modules/execution/execution.repository"
);
const workflowActionRepository = require(
  "../modules/workflow-action/workflow-action.repository"
);
const executeAction = require(
  "../executors/action.executor"
);

const worker = new Worker(
  "workflow-execution",
  async (job) => {
    const { workflowId, payload } = job.data;

    console.log(
      `🚀 Executing Workflow ${workflowId}`
    );

    const actions =
      await workflowActionRepository.getWorkflowActions(
        workflowId
      );
    console.log(
      `Found ${actions.length} actions for workflow ${workflowId}`
    );
    for (const action of actions) {
      await executeAction(
        action,
        payload
      );
    }

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
