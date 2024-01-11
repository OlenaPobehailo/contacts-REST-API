const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  try {
    const emailOptions = {
      ...data,
      from: process.env.GMAIL_USER,
    };

    console.log("emailOptions.from", emailOptions.from);

    const info = await transporter.sendMail(emailOptions);
    console.log(info);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// sendEmail({
//   to: "xisoye7326@tanlanav.com",
//   subject: "Nodemailer test",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// });

module.exports = sendEmail;
