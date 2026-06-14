const {
  triggerEventSchema,
} = require("./event.validation");

const eventService = require("./event.service");

const triggerEvent = async (req, res) => {
  try {
    const validatedData =
      triggerEventSchema.parse(req.body);

    const count =
      await eventService.triggerEvent(
        validatedData
      );

    return res.json({
      success: true,
      workflowsTriggered: count,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  triggerEvent,
};