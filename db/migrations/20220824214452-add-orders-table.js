'use strict';

const { ORDER_TABLE_NAME, OrderSchema } = require('../models/order.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_TABLE_NAME, OrderSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_TABLE_NAME);
  },
};
