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
        //implement try catch on action execution and log to execution log with status FAILED if any action fails,
        // and SUCCESS if all actions succeed
        try {
            for (const action of actions) {
                await executeAction(action, payload);
            }

            await executionRepository.createExecutionLog({
                workflowId,
                status: "SUCCESS",
                payload,
            });
        } catch (error) {
            await executionRepository.createExecutionLog({
                workflowId,
                status: "FAILED",
                payload: {
                    error: error.message,
                    originalPayload: payload,
                },
            });

            throw error;
        }
    },
    {
        connection,
    }
);

worker.on("completed", (job) => {
    console.log(
        `✅ Job ${job.id} completed`
    );
});

worker.on("failed", (job, error) => {
    console.log(
        `❌ Job ${job.id} failed`
    );

    console.log(error.message);
});

module.exports = worker;
