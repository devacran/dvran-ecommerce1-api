const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const {
  createOrderSchema,
  getOrderSchema,
  createOrderItemsSchema,
} = require('../schemas/order.schema');
const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');

const router = express.Router();
const service = new OrderService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('customer'),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('customer'),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:id/add-items',
  passport.authenticate('jwt', { session: false }),
  checkRoles('customer'),
  validatorHandler(createOrderItemsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id: orderId } = req.params;
      const body = req.body;
      const newOrder = await service.createOrderItems(orderId, body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
