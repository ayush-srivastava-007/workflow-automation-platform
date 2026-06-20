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

const updateWorkflow = async (
  id,
  userId,
  updateData
) => {
  const workflow =
    await workflowRepository.findWorkflowById(
      id,
      userId
    );

  if (!workflow) {
    return null;
  }

  return workflowRepository.updateWorkflow(
    id,
    updateData
  );
};

const toggleWorkflow = async (id, userId) => {
  const workflow =
    await workflowRepository.findWorkflowById(
      id,
      userId
    );

  if (!workflow) {
    return null;
  }

  return workflowRepository.updateWorkflow(id, {
    isActive: !workflow.isActive,
  });
};

const deleteWorkflow = async (id, userId) => {
  const workflow =
    await workflowRepository.findWorkflowById(
      id,
      userId
    );

  if (!workflow) {
    return null;
  }

  await workflowRepository.deleteWorkflow(id);

  return workflow;
};

module.exports = {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
  updateWorkflow,
  toggleWorkflow,
  deleteWorkflow,
};
