import { sequelize } from '../../examples/db';
import Sequelize, { Model } from 'sequelize';

class SomeModel extends Model {}
SomeModel.init(
  {
    data: {
      type: Sequelize.JSONB,
    },
  },
  { sequelize, modelName: 'somemodels' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // insert
    const data = { name: 'orm', age: 23 };
    await SomeModel.create({ data });

    // find
    const row = await SomeModel.findByPk(1, { raw: true });
    console.log(row);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
