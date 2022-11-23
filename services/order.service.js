const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async createOrderItems(orderId, data) {
    const orderProducts = data.products.map((product) => {
      const mapProduct = { ...product };
      mapProduct.orderId = orderId;
      return mapProduct;
    });
    const newItem = await models.OrderProduct.bulkCreate(orderProducts);
    return newItem;
  }

  async find() {
    const rta = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: [
            {
              association: 'user',
              attributes: { exclude: ['recoveryToken', 'password'] },
            },
          ],
        },
        'items',
      ],
    });
    return rta;
  }

  async findByUser(userId) {
    const rta = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: [
            {
              association: 'user',
              attributes: { exclude: ['recoveryToken', 'password'] },
            },
          ],
        },
        'items',
      ],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!user) {
      throw boom.notFound('order not found');
    }
    return user;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    order.update(changes);
    return {
      id: order.id,
      changes,
    };
  }

  async delete(id) {
    const order = await this.findOne(id);
    order.destroy();
    return { id };
  }
}

module.exports = OrderService;
