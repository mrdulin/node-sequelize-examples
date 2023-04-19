import { sequelize } from '../../examples/db';
import Sequelize, { Model, DataTypes, Op } from 'sequelize';

class Units extends Model {}
Units.init(
  {
    uDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'units' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    const date1 = new Date();
    date1.setMonth(date1.getMonth() - 1);
    await Units.bulkCreate([{ uDate: new Date() }, { uDate: date1 }]);
    // test
    const year = '2020';
    const month = '4';
    const result = await Units.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.literal('EXTRACT(YEAR FROM "units"."uDate")'), year),
          Sequelize.where(Sequelize.literal('EXTRACT(MONTH FROM "units"."uDate")'), month),
        ],
      },
      raw: true,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
