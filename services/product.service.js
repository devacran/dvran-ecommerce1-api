const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(params) {
    const options = {
      include: ['category'],
      attributes: {
        exclude: ['category_id'],
      },
    };

    const { limit, offset } = params;
    if (limit && offset) {
      options.offset = offset;
      options.limit = limit;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    product.update(changes);
    return {
      id: product.id,
      changes: changes,
    };
  }

  async delete(id) {
    const product = await this.findOne(id);
    product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
