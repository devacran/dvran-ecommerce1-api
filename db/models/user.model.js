const bcrypt = require('bcrypt');
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE_NAME = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM('customer', 'admin'),
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE_NAME,
      modelName: 'User', // model name to use this class as a model
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
        afterCreate: (user) => {
          delete user.dataValues.password;
        },
        afterUpdate: (user) => {
          delete user.dataValues.password;
        },
      },
    };
  }
}

module.exports = {
  User,
  UserSchema,
  USER_TABLE_NAME,
};
