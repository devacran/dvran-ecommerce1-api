'use strict';

module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: sequelize.STRING,
      },
      role: {
        allowNull: false,
        type: sequelize.ENUM('customer', 'admin'),
        defaultValue: 'customer',
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
        field: 'create_at',
        defaultValue: sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
