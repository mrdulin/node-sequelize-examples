import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'users',
    hooks: {
      beforeCreate: (user) => {
        console.log('======== ae ========');
      },
    },
  },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    await User.create({ name: 'Alanna', email: 'example@gmail.com', login: 'value', password: '123' });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
