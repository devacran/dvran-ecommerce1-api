//const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');
class CustomerService {
  async create(data) {
    const newUser = await models.User.create(data.user);
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id,
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
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = CustomerService;
