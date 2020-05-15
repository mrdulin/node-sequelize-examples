import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    email: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
  },
  { sequelize, modelName: 'User' },
);

class UserAddress extends Model {}
UserAddress.init(
  {
    userId: { type: DataTypes.INTEGER },
    city: { type: DataTypes.STRING },
    street: { type: DataTypes.STRING },
    house: { type: DataTypes.STRING },
  },
  { sequelize, modelName: 'UserAddress' },
);

User.hasMany(UserAddress, { as: 'addresses' });
UserAddress.belongsTo(User);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.create(
      {
        email: 'example@gmail.com',
        name: 'Tom',
        surname: 'jerry',
        addresses: [{ city: 'London', street: 'a', house: 'b' }],
      },
      { include: [{ model: UserAddress, as: 'addresses' }] },
    );
    // test
    const user = await User.findOne({
      where: { email: 'example@gmail.com' },
      include: [{ model: UserAddress, as: 'addresses' }],
      raw: true,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  } finally {
    sequelize.close();
  }
})();
