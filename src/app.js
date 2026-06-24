const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());

// API docs (Swagger UI at /api-docs, raw spec at /api-docs.json).
// Mounted before helmet() so its strict Content-Security-Policy doesn't
// block Swagger UI's inline bootstrap script (which renders the page blank).
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use("/api",routes);
app.use(morgan("dev"));

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Liveness check
 *     responses:
 *       200:
 *         description: Service is up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 */
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Workflow Automation Platform is running",
  });
});

module.exports = app;