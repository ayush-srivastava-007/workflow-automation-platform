const { z } = require("zod");

const createActionSchema = z.object({
  actionType: z.enum(["LOG"]),
  sequence: z.number().int().positive(),
  config: z.any().optional(),
});

module.exports = {
  createActionSchema,
};