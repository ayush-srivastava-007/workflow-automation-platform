const workflowActionService = require(
  "./workflow-action.service"
);

const {
  createActionSchema,
} = require("./workflow-action.validation");

const createAction = async (req, res) => {
  try {
    const validatedData =
      createActionSchema.parse(req.body);

    const action =
      await workflowActionService.createAction(
        req.params.workflowId,
        validatedData
      );

    return res.status(201).json({
      success: true,
      data: action,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getActions = async (req, res) => {
  const actions =
    await workflowActionService.getActions(
      req.params.workflowId
    );

  return res.json({
    success: true,
    data: actions,
  });
};

module.exports = {
  createAction,
  getActions,
};