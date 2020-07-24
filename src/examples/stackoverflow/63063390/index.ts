import { sequelize } from '../../db';
import { Model, DataTypes, Op } from 'sequelize';

class MyTable extends Model {}
MyTable.init(
  {
    aliases: DataTypes.STRING,
  },
  { sequelize },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await MyTable.bulkCreate([{ aliases: 'energetic' }, { aliases: 'a' }, { aliases: 'b' }]);
    // test
    const values = await MyTable.findAll({
      where: {
        aliases: { [Op.any]: ['energetic'] },
      },
    });
    console.log(values);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
