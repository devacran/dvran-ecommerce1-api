const nodemailer = require('nodemailer');
const UserService = require('../services/user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userService = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      return boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return boom.unauthorized();
    }
    return user;
  }

  genToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    delete user.dataValues.password;

    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecoveryMail(userEmail) {
    let userAccount = {};
    try {
      userAccount = await userService.findByEmail(userEmail);
      try {
        const { host, port, user: smtpEmail, password } = config.smtp;
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: true,
          auth: {
            user: smtpEmail,
            pass: password,
          },
        });
        await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>',
          to: userAccount.email,
          subject: 'Hello ✔',
          text: 'Hello world?',
          html: '<b>Hello world?</b>',
        });
      } catch (error) {
        throw boom.internal();
      }
    } catch (error) {
      throw boom.unauthorized();
    }

    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
