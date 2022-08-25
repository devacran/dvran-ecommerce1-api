const { PRODUCT_TABLE_NAME } = require('./product.model');
const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE_NAME } = require('./order.model');
const ORDER_PRODUCT_TABLE_NAME = 'orders_products';

const orderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class OrderProduct extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE_NAME,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}
module.exports = {
  ORDER_PRODUCT_TABLE_NAME,
  orderProductSchema,
  OrderProduct,
};
