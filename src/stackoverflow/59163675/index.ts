/* eslint-disable @typescript-eslint/camelcase */
import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class Tbl extends Model {}
Tbl.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    organization_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'tbls' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
