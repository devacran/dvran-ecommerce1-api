const express = require('express');
const router = express.Router();
const OrderService = require('./../services/order.service');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const orderService = new OrderService();

router.get(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  checkRoles('customer'),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const order = await orderService.findByUser(userId);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
