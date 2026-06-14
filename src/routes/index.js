const router = require("express").Router();
const authRoutes = require("../modules/auth/auth.routes");
const workflowRoutes = require(
  "../modules/workflow/workflow.routes"
);
const eventRoutes = require("../modules/event/event.routes");
router.use("/auth", authRoutes);
router.use("/workflows", workflowRoutes);
router.use("/events",eventRoutes);

router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "API Working",
  });7
});

module.exports = router;