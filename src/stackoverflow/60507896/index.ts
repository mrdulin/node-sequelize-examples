import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class SomeModel extends Model {}
SomeModel.init(
  {
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'some_models' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await SomeModel.create({ startTime: '14:27:00' });
    // test
    const rval = await SomeModel.findOne({ where: { startTime: '14:27:00' }, raw: true });
    console.log(rval);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
