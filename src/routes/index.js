const router = require("express").Router();
const authRoutes = require("../modules/auth/auth.routes");
const workflowRoutes = require(
  "../modules/workflow/workflow.routes"
);

router.use("/auth", authRoutes);
router.use("/workflows", workflowRoutes);

router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "API Working",
  });
});

module.exports = router;