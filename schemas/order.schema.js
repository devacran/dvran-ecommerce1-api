const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const quantity = Joi.number().integer().max(10);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const createOrderItemSchema = Joi.object({
  quantity: quantity.required(),
  orderId: id.required(),
  productId: id.required(),
});

module.exports = { getOrderSchema, createOrderSchema, createOrderItemSchema };
