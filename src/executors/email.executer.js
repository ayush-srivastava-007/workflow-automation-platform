const transporter = require("../config/mail");

const executeEmailAction = async (
  action,
  payload
) => {
  const {
    to,
    subject,
  } = action.config;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to,

    subject,

    html: `
      <h2>Workflow Notification</h2>

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