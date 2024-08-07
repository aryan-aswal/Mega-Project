const { mailSender } = require('../utils/mailSender');
require('dotenv').config();
const contactUs = async (req, res) => {
  const { firstName, lastName, email, message, phoneNumber } = req.body;
  if (!firstName || !email || !message) {
    return res.status(403).send({
      success: false,
      message: "All Fields are required",
    });
  }
  try {
    const data = {
      firstName,
      lastName: `${lastName ? lastName : "null"}`,
      email,
      message,
      phoneNumber: `${phoneNumber ? phoneNumber : "null"}`,
    };
    console.log(data);
    const info = await mailSender(
        process.env.MAIL_USER,
      "Enquery",
      `<html><body>${Object.keys(data).map((key) => {
        return `<p>${key} : ${data[key]}</p>`;
      })}</body></html>`
    );
    console.log("hello");
    if (info) {
      return res.status(200).send({
        success: true,
        message: "Your message has been sent successfully",
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { contactUs }
