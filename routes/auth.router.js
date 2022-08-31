const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthService = require('../services/auth.service');
const service = new AuthService();
const validatorHandler = require('./../middlewares/validator.handler');
const { recoveryEmailSchema } = require('../schemas/auth.schema');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.genToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  validatorHandler(recoveryEmailSchema, 'body'),
  async (req, res, next) => {
    try {
      const email = req.body.email;
      const rta = await service.sendRecoveryMail(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
