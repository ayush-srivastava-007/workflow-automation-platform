const workflowService = require("./workflow.service");
const {
  createWorkflowSchema,
} = require("./workflow.validation");

const createWorkflow = async (req, res) => {
  try {
    const validatedData =
      createWorkflowSchema.parse(req.body);

    const workflow =
      await workflowService.createWorkflow(
        req.user.userId,
        validatedData
      );

    return res.status(201).json({
      success: true,
      data: workflow,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getWorkflows = async (req, res) => {
  const workflows =
    await workflowService.getWorkflows(
      req.user.userId
    );

  return res.json({
    success: true,
    data: workflows,
  });
};

const getWorkflowById = async (req, res) => {
  try {
    const workflow =
      await workflowService.getWorkflowById(
        req.params.id,
        req.user.userId
      );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    return res.json({
      success: true,
      data: workflow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
};
