import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.create({ name: 'John' });
    // insert multiple instances in bulk
    await User.bulkCreate([{ name: 'teresa teng' }, { name: 'slideshowp2' }, { name: 'John' }], {
      updateOnDuplicate: ['name'],
    });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
