const UserService = require('../services/user.service');
const MailService = require('../services/mail.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userService = new UserService();
const mailService = new MailService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
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

  async resetPassword(token, newPassword) {
    const { sub: userId } = jwt.verify(token, config.jwtSecret);
    const user = await userService.findOne(userId);
    if (token !== user.recoveryToken) {
      throw boom.unauthorized();
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userService.update(userId, {
      password: hashedPassword,
      recoveryToken: null,
    });

    return { message: 'password changed' };
  }

  async genRecoveryUrl(userEmail) {
    try {
      const userAccount = await userService.findByEmail(userEmail);
      const payload = {
        sub: userAccount.id,
      };
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
      const resetLink = `${config.siteUrl}/recovery?token=${token}`;
      await userService.update(userAccount.id, {
        recoveryToken: token,
      });
      return {
        resetLink,
        userAccount,
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendRecoveryMail(userEmail) {
    try {
      const { resetLink, userAccount } = await this.genRecoveryUrl(userEmail);
      const email = {
        from: 'dvranEcommerce dvran.test@gmail.com',
        to: userAccount.dataValues.email,
        subject: `Password Recovery Request`,
        text: `Follow the instructions to recover you password`,
        html: `<div>Reset your password <a href=${resetLink}>Here</a></div>`,
      };
      await mailService.sendEmail(email);
    } catch (error) {
      throw boom.internal();
    }

    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
