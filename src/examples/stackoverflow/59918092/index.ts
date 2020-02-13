import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db';

class SomeEntity extends Model {}
SomeEntity.init(
  {
    client_data: {
      type: DataTypes.TEXT({ length: 'long' }),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'SomeEntities' },
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
