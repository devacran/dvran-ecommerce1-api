const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE_NAME } = require('./customer.model');
const ORDER_TABLE_NAME = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  // total: {
  //   type: DataTypes.VIRTUAL,
  //   get() {
  //     if (this.items.length > 0) {
  //       return this.items.reduce((total, item) => {
  //         return total + item.price * item.OrderProduct.quantity;
  //       }, 0);
  //     }
  //     return 0;
  //   },
  // },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customer_id',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE_NAME,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = {
  Order,
  ORDER_TABLE_NAME,
  OrderSchema,
};
