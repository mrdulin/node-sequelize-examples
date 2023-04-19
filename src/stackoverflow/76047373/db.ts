import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import * as models from './models';

const config = {
  db: {
    database: 'test',
    username: 'root',
    password: '',
    host: '127.0.0.1',
    dialect: 'sqlite',
  },
};
const DBInstance = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect as Dialect,
  storage: ':memory:',
  repositoryMode: true,
  models: Object.values(models),
});

export default DBInstance;
