const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class UserService {
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({ include: ['customer'] });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
      include: ['customer'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    user.update(changes);
    return {
      id: user.id,
      changes: changes,
    };
  }

  async delete(id) {
    const user = await this.findOne(id);
    user.destroy();
    return { id };
  }
}

module.exports = UserService;
