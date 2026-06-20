const emailService = require("../services/email.service");

const executeEmailAction = async (
  action,
  payload
) => {
  const {
    to,
    subject,
  } = action.config;

  await emailService.sendEmail({
    to,
    subject,
    html: `
      <h2>Workflow Triggered</h2>

      <pre>
${JSON.stringify(payload, null, 2)}
      </pre>
    `,
  });

    console.log(
    `📧 Email sent to ${to}`
  );
};

module.exports = executeEmailAction;
