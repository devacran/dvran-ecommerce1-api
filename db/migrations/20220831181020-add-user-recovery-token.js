'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'recovery_token');
  },
};
