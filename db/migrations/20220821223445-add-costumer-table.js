'use strict';
const {
  CustomerSchema,
  CUSTOMER_TABLE_NAME,
} = require('../models/customer.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE_NAME, CustomerSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE_NAME);
  },
};
