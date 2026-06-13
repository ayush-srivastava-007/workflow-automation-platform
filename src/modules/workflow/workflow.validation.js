const { z } = require("zod");

const createWorkflowSchema = z.object({
  name: z.string().min(3),
  triggerType: z.string().min(3),
});

module.exports = {
  createWorkflowSchema,
};