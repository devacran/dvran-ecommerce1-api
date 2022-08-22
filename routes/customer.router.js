const express = require('express');

const CustomerService = require('./../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {}
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {}
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {}
);

module.exports = router;
