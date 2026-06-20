const router = require("express").Router();

const authenticate = require(
  "../../middleware/auth.middleware"
);

const controller = require(
  "./execution.controller"
);

router.get(
  "/",
  authenticate,
  controller.getExecutions
);

router.get(
  "/:id",
  authenticate,
  controller.getExecutionById
);

module.exports = router;