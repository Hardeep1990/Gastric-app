//requires the send grid module
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

exports.handler = async function (event, context) {
  //send grid API key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // default email address to send email to, this needs to be the same email that is verified on sendgrid during setup
  //const defaultEmail = "BSGM@auckland.ac.nz";
  const defaultEmail = "pankajp@missionreadyhq.com";
  // const gaylEmail = "g.humphrey@auckland.ac.nz";

  //fields used on frontend. Key/values need to be parsed in order to be used or will return as undefined. If you assign the object to a variable on the frontend you will not need to parse on backend.
  const { name, fromEmail, participantId, supportType, message } = JSON.parse(
    event.body
  );

  //frontend values need to be combined in to a variable, adding multiple values to a key will return an object that wont send via email.
  const actualMessage = `Name: ${name}\nFrom: ${fromEmail}\nID: ${participantId}\nMessage: ${message}`;

  try {
    await sgMail.send({
      to: defaultEmail,
      from: defaultEmail,
      subject: supportType,
      text: actualMessage,
    });
    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
