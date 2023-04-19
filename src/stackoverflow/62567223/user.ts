import { sequelize } from '../../examples/db';
import Sequelize, { Model } from 'sequelize';

class User extends Model {}
User.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, tableName: 'User', modelName: 'user' },
);

export { User };
