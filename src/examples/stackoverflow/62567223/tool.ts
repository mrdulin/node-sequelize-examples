import { sequelize } from '../../db';
import Sequelize, { Model } from 'sequelize';

class Tool extends Model {}
Tool.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, tableName: 'Tool', modelName: 'tool' },
);

export { Tool };
