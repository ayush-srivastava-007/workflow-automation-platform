const router = require("express").Router();

const authenticate = require(
  "../../middleware/auth.middleware"
);

const controller = require(
  "./execution.controller"
);

/**
 * @swagger
 * /api/executions:
 *   get:
 *     tags: [Executions]
 *     summary: List the authenticated user's workflow executions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of executions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Execution' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  "/",
  authenticate,
  controller.getExecutions
);

/**
 * @swagger
 * /api/executions/{id}:
 *   get:
 *     tags: [Executions]
 *     summary: Get a single execution by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The execution
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Execution' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get(
  "/:id",
  authenticate,
  controller.getExecutionById
);

module.exports = router;