import { Sequelize } from 'sequelize';
import assert from 'assert';

const database = 'sample';
const user = 'testuser';
const password = 'testpass';
const host = '127.0.0.1';

const sequelize =
  process.env.NODE_ENV === 'production'
    ? 'sequelize heroku'
    : new Sequelize(database, user, password, {
        host,
        dialect: 'mysql',
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

assert(process.env.NODE_ENV === 'production', 'NODE_ENV should be "prodution"');
assert(sequelize === 'sequelize heroku', 'Should use heroku sequelize in production environment');
