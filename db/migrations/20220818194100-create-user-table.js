'use strict';
const { UserSchema, USER_TABLE_NAME } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE_NAME, UserSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE_NAME);
  },
};
