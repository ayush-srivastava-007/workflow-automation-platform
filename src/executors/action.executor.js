const executeLogAction = require(
  "./log.executor"
);

const executeEmailAction = require(
  "./email.executor"
);

const executeWebhookAction = require(
  "./webhook.executor"
);

//registry pattern for action executors
const executors = {

  LOG: executeLogAction,

  EMAIL: executeEmailAction,

  WEBHOOK: executeWebhookAction,

};

const executeAction = async (
  action,
  payload
) => {

  const executor =
    executors[action.actionType];

  if (!executor) {

    throw new Error(
      `Unsupported action ${action.actionType}`
    );

  }

  return executor(
    action,
    payload
  );
};

module.exports =
  executeAction;