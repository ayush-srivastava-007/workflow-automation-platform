const { z } = require("zod");

const createWorkflowSchema = z.object({
  name: z.string().min(3),
  triggerType: z.string().min(3),
});

const updateWorkflowSchema = z
  .object({
    name: z.string().min(3),
    triggerType: z.string().min(3),
    isActive: z.boolean(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

module.exports = {
  createWorkflowSchema,
  updateWorkflowSchema,
};