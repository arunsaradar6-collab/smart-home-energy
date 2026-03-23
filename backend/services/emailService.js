const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arunsaradar6@gmail.com",
    pass: "qxru kkko ztwa oeuw"
  }
});

async function sendEmail(message) {
  try {
    await transporter.sendMail({
      from: "Smart Energy <arunsaradar6@gmail.com>",
      to: "manjunathkumbar0713@gmail.com",
      subject: "⚡ Smart Energy Alert",
      text: message
    });

    console.log("✅ Email sent!");
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
}

module.exports = sendEmail;