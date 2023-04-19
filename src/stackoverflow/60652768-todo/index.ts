import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize, modelName: 'users' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    const result = await User.bulkCreate([{ name: 'james' }, { name: 'elsa' }, { name: new Date() }]);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
