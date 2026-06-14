const workflowActionRepository = require(
  "./workflow-action.repository"
);

const createAction = async (
  workflowId,
  actionData
) => {
  return workflowActionRepository.createAction({
    workflowId,
    ...actionData,
  });
};

const getActions = async (workflowId) => {
  return workflowActionRepository.getWorkflowActions(
    workflowId
  );
};

module.exports = {
  createAction,
  getActions,
};