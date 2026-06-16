const executeLogAction = require(
  "./log.executor"
);

const executeEmailAction = require(
  "./email.executor"
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

    case "EMAIL":

      return executeEmailAction(
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