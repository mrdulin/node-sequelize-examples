import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import faker from 'faker';

class Test extends Model {}
Test.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'tests', modelName: 'test', indexes: [{ name: 'name_index', fields: ['name'] }] },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    for (let i = 0; i < 400; i++) {
      const datas = Array.from({ length: 10000 }).map((_) => ({ name: faker.name.findName() }));
      await Test.bulkCreate(datas, { benchmark: true });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
