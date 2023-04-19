import { sequelize } from '../../examples/db';
import Sequelize, { Model } from 'sequelize';

const { DATE } = Sequelize;

class Test extends Model {}
Test.init(
  {
    eventDate: {
      type: DATE,
    },
  },
  { sequelize, tableName: 'tests' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // test 1
    const data1 = await Test.create({ eventDate: '2020-05-30 02:00:00' });
    const data2 = await Test.create({ eventDate: '2020-03-14T15:32:42.782Z' });
    console.log(data1.toJSON(), data2.toJSON());
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
