const router = require("express").Router();

const authenticate = require("../../middleware/auth.middleware");

const workflowController = require("./workflow.controller");

router.post(
  "/",
  authenticate,
  workflowController.createWorkflow
);

router.get(
  "/",
  authenticate,
  workflowController.getWorkflows
);

router.get(
  "/:id",
  authenticate,
  workflowController.getWorkflowById
);

module.exports = router;
