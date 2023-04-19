import { sequelize } from '../../examples/db';
import { DataTypes, Model } from 'sequelize';
import faker from 'faker';

class User extends Model {}
User.init(
  {
    userId: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'UserId',
    },
    userEmail: {
      type: DataTypes.STRING,
      field: 'UserEmail',
    },
    userAvatar: {
      type: DataTypes.STRING,
      field: 'UserAvatar',
    },
  },
  { sequelize },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.bulkCreate([
      { userEmail: faker.internet.email(), userAvatar: faker.internet.avatar() },
      { userEmail: faker.internet.email(), userAvatar: faker.internet.avatar() },
      { userEmail: faker.internet.email(), userAvatar: faker.internet.avatar() },
    ]);
    const users = await User.findAll();
    const userDataValues = users.map((u) => u.dataValues);
    console.log(userDataValues);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
