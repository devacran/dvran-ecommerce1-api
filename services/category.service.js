const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class CategoryService {
  async create(data) {
    const category = models.Category.create(data);
    return category;
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    category.update(changes);
    return {
      id: category.id,
      changes,
    };
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return { id };
  }
}

module.exports = CategoryService;
