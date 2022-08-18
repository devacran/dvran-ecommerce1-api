'use strict';
const { UserSchema, USER_TABLE_NAME } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE_NAME, 'role', UserSchema.role);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE_NAME, 'role');
  },
};
