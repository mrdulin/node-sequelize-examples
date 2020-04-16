import { sequelize } from '../../db';
import Sequelize, { Model, DataTypes, Op } from 'sequelize';

class Jts extends Model {}
Jts.init(
  {
    publish: DataTypes.BOOLEAN,
    retry: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: 'jts' },
);

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // seed
    let date1 = new Date();
    date1.setHours(date1.getHours() - 1);
    await Jts.bulkCreate([
      { publish: false, retry: 2 },
      { publish: false, retry: 5 },
      { publish: true, retry: 2, updatedAt: date1 },
      { publish: true, retry: 1, updatedAt: new Date() },
    ]);
    // test
    const result = await Jts.findOne({
      where: {
        publish: true,
        retry: {
          [Op.lte]: 3,
        },
        updatedAt: {
          [Op.lte]: Sequelize.literal("NOW() - (INTERVAL '5 MINUTE')"),
        },
      },
      raw: true,
    });
    console.log('result:', result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
