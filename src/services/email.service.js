const transporter = require("../config/mail");

const DEFAULT_FROM = "workflow@automation.com";

const sendEmail = async ({ to, subject, html, from }) => {
  await transporter.sendMail({
    from: from || DEFAULT_FROM,
    to,
    subject,
    html,
  });

};

module.exports = {
  sendEmail,
};
