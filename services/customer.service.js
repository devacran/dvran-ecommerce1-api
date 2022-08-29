const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class CustomerService {
  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });

    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
      attributes: { exclude: ['userId'] },
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    customer.update(changes);
    return {
      id: customer.id,
      changes: changes,
    };
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
