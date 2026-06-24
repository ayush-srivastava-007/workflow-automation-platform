const router = require("express").Router();

const authenticate = require(
  "../../middleware/auth.middleware"
);

const controller = require(
  "./workflow-action.controller"
);

/**
 * @swagger
 * /api/workflows/{workflowId}/actions:
 *   post:
 *     tags: [Workflow Actions]
 *     summary: Add an action to a workflow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workflowId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateActionRequest'
 *     responses:
 *       201:
 *         description: Action created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/WorkflowAction' }
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post(
  "/:workflowId/actions",
  authenticate,
  controller.createAction
);

/**
 * @swagger
 * /api/workflows/{workflowId}/actions:
 *   get:
 *     tags: [Workflow Actions]
 *     summary: List a workflow's actions (ordered by sequence)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workflowId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Array of actions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/WorkflowAction' }
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  "/:workflowId/actions",
  authenticate,
  controller.getActions
);

module.exports = router;