'use strict';
const { USER_TABLE_NAME } = require('../models/user.model');

module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.changeColumn(USER_TABLE_NAME, 'role', {
      type: sequelize.DataTypes.ENUM('customer', 'admin'),
    });
  },

  async down() {
    //await queryInterface.dropTable(CUSTOMER_TABLE_NAME);
  },
};
