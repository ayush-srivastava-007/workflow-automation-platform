const executeLogAction = require(
  "./log.executor"
);

const executeAction = async (
  action,
  payload
) => {
  switch (action.actionType) {
    case "LOG":
      return executeLogAction(
        action,
        payload
      );

    default:
      throw new Error(
        `Unsupported action type ${action.actionType}`
      );
  }
};

module.exports = executeAction;
