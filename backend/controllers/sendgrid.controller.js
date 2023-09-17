const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const contactForm = async (req, res) => {
  // default email address to send email to
  const defaultEmail = "nihi.developer@gmail.com";
  // const gaylEmail = "g.humphrey@auckland.ac.nz";

  //values from frontend.
  const { name, fromEmail, participantId, supportType, message } = req.body;

  //frontend values need to be combined in to a variable, adding multiple values to a key will return an object that wont send via email.
  const actualMessage = `Name: ${name}\nFrom: ${fromEmail}\nID: ${participantId}\nMessage: ${message}`;

  try {
    await sgMail.send({
      to: defaultEmail,
      from: fromEmail,
      subject: supportType,
      text: actualMessage,
    });
    console.log("Email sent");
    res.send("Success");
  } catch (error) {
    res.send(error);
  }
};

module.exports = { contactForm };
