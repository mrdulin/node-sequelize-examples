import { sequelize } from '../../db';
import Sequelize, { Model, DataTypes } from 'sequelize';

class Industry extends Model {}
Industry.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'industries' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Industry.bulkCreate([{ name: 'a' }, { name: 'A' }]);
    // test
    const data = await Industry.findOne({
      where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), 'a'),
      raw: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
