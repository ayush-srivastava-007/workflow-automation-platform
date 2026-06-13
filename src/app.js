const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api",routes);
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Workflow Automation Platform is running",
  });
});

module.exports = app;