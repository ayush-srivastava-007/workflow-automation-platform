const axios = require("axios");

const executeWebhookAction = async (
  action,
  payload
) => {

  const { url } = action.config;

  const response = await axios.post(
    url,
    payload
  );

  console.log(
    `🌐 Webhook executed`
  );

  return response.data;
};

module.exports =
  executeWebhookAction;