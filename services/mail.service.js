const nodemailer = require('nodemailer');
const config = require('../config');
const { host, port, user, password } = config.smtp;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass: password,
      },
    });
  }

  async sendEmail(emailData) {
    await this.transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    });
  }
}
module.exports = MailService;
