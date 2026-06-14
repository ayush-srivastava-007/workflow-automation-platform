const { z } = require("zod");

const triggerEventSchema = z.object({
  eventType: z.string(),
  payload: z.any(),
});

module.exports = {
  triggerEventSchema,
};