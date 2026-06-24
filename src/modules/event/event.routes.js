
const router = require("express").Router();

const eventController = require(
  "./event.controller"
);

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags: [Events]
 *     summary: Fire an event to trigger matching workflows
 *     description: >
 *       Enqueues the event for the background worker. Every active workflow whose
 *       triggerType matches eventType has its actions executed asynchronously.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TriggerEventRequest'
 *     responses:
 *       200:
 *         description: Event accepted and queued
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post(
  "/",
  eventController.triggerEvent
);

module.exports = router;