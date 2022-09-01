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

const orderItem = Joi.object({
  quantity: quantity.required(),
  productId: id.required(),
});

const createOrderItemsSchema = Joi.object({
  products: Joi.array().items(orderItem).required(),
});

module.exports = { getOrderSchema, createOrderSchema, createOrderItemsSchema };
