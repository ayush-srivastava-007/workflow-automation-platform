
const router = require("express").Router();

const eventController = require(
  "./event.controller"
);

router.post(
  "/",
  eventController.triggerEvent
);

module.exports = router;