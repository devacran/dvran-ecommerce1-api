const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const rta = await models.Order.findAll({ include: ['customer'] });
    return rta;
  }

  async findOne(id) {
    const user = await models.Order.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
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
