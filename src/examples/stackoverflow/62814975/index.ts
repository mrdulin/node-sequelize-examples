import { sequelize } from '../../db';
import { Model, DataTypes, Op } from 'sequelize';

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    type1: DataTypes.STRING,
    type2: DataTypes.STRING,
  },
  { sequelize, tableName: 'users', modelName: 'user' },
);

(async function() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.bulkCreate([
      { id: 1, name: 'mike', type1: 'a', type2: 'a' },
      { id: 2, name: 'tobias', type1: 'c', type2: 'd' },
    ]);

    // test
    const inputType = 'a';
    const inputName = 'mike';
    const query = { where: { id: 1, name: inputName } };
    if (inputType) {
      query['where'][Op.and] = [{ type1: inputType }, { type2: inputType }];
    }
    const r = await User.findAll(query);
    console.log(r);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
