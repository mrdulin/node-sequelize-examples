import { sequelize } from '../../examples/db';
import Sequelize, { Model } from 'sequelize';

class UserTool extends Model {}
UserTool.init(
  {
    userId: {
      type: Sequelize.INTEGER,
    },
    toolId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.STRING,
    },
  },
  { sequelize, tableName: 'UserTool' },
);

export { UserTool };
