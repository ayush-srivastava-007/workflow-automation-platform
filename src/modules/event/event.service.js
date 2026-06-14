const workflowRepository = require(
  "../workflow/workflow.repository"
);

const executionRepository = require(
  "../execution/execution.repository"
);

const workflowQueue = require(
  "../../queues/workflow.queue"
);

const triggerEvent = async ({
  eventType,
  payload,
}) => {
  const workflows =
    await workflowRepository.findWorkflowsByTriggerType(
      eventType
    );

  for (const workflow of workflows) {
    console.log(
      `Executing workflow: ${workflow.name}`
    );

    // await executionRepository.createExecutionLog({
    //   workflowId: workflow.id,
    //   status: "SUCCESS",
    //   payload,
    // });

    await workflowQueue.add(
      "execute-workflow",
      {
        workflowId: workflow.id,
        payload,
      }
    );
    
  }

  return workflows.length;
};

module.exports = {
  triggerEvent,
};