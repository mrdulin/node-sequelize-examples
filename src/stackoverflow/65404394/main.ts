import { sequelize } from '../../examples/db';
import Sequelize, { Model, DataTypes } from 'sequelize';

class Customer extends Model {}
Customer.init(
  {
    gender: DataTypes.STRING,
  },
  { sequelize, tableName: 'customers' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Customer.bulkCreate([{ gender: 'male' }, { gender: 'male' }, { gender: 'male' }, { gender: 'female' }]);

    // test
    const customers = await Customer.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('gender')), 'genderCount']],
      where: {
        gender: 'male',
      },
      raw: true,
    });
    // test 2
    // const customers = await Customer.count({ col: 'gender', where: { gender: 'male' } });
    console.log(customers);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
