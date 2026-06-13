const router = require("express").Router();

const authRoutes = require("../modules/auth/auth.routes");

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "API Working",
  });
});

module.exports = router;