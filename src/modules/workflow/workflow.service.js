const workflowRepository = require("./workflow.repository");

const createWorkflow = async (
  userId,
  workflowData
) => {
  return workflowRepository.createWorkflow({
    ...workflowData,
    userId,
  });
};

const getWorkflows = async (userId) => {
  return workflowRepository.findWorkflowsByUserId(
    userId
  );
};

const getWorkflowById = async (id, userId) => {
  return workflowRepository.findWorkflowById(
    id,
    userId
  );
};

module.exports = {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
};
