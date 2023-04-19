import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    profilePicture: DataTypes.BLOB,
  },
  { sequelize, modelName: 'users', timestamps: true },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.bulkCreate([
      {
        firstName: 'Andrew',
        lastName: 'Perera',
        fullName: 'Andrew Perera',
        createdAt: new Date(),
        updatedAt: new Date(),
        profilePicture: Buffer.from('whatever'),
      },
    ]);
    const user = await User.findOne({ raw: true });
    console.log('user:', user);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
