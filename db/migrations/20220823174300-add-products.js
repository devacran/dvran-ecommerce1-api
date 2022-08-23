'use strict';

const {
  CategorySchema,
  CATEGORY_TABLE_NAME,
} = require('./../models/category.model');
const {
  ProductSchema,
  PRODUCT_TABLE_NAME,
} = require('./../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORY_TABLE_NAME, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE_NAME, ProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CATEGORY_TABLE_NAME);
    await queryInterface.dropTable(PRODUCT_TABLE_NAME);
  },
};
