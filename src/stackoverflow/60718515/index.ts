import { sequelize } from '../../examples/db';
import Sequelize, { Model, DataTypes, Op } from 'sequelize';

class Employee extends Model {}
Employee.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'Employee' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Employee.bulkCreate([{ name: 'james' }, { name: 'JOHN' }, { name: 'JANE' }]);
    // test
    const result = await Employee.findAll({
      where: {
        name: {
          [Op.or]: [
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', 'john%'),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', 'jane%'),
          ],
        },
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

// {
//   [Op.like]: 'john%',
// },
// {
//   [Op.like]: 'jane%',
// },
