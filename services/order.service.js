const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async createOrderItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const rta = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
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
      changes: changes,
    };
  }

  async delete(id) {
    const order = await this.findOne(id);
    order.destroy();
    return { id };
  }
}

module.exports = OrderService;
