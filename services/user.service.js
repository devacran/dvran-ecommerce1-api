const boom = require('@hapi/boom');
const postgresPool = require('../lib/postgres.pool');

class UserService {
  constructor() {
    this.pool = postgresPool;
    this.pool.on('error', (err) => {
      console.error('Error conencting to postgres', err);
      process.exit(-1);
    });
  }

  async create(data) {
    return data;
  }

  async find() {
    const rta = await this.pool.query('SELECT * FROM tasks');
    return rta.rows;
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

module.exports = UserService;
