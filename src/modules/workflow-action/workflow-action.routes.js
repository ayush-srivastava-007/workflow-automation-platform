const router = require("express").Router();

const authenticate = require(
  "../../middleware/auth.middleware"
);

const controller = require(
  "./workflow-action.controller"
);

router.post(
  "/:workflowId/actions",
  authenticate,
  controller.createAction
);

router.get(
  "/:workflowId/actions",
  authenticate,
  controller.getActions
);

module.exports = router;