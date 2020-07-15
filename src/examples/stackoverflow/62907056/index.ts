import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    totp_active: DataTypes.STRING,
    is_active: DataTypes.STRING,
  },
  { sequelize, tableName: 'users', modelName: 'user' },
);
User.addHook('beforeValidate', function(user, options) {
  const obj = user.toJSON();
  delete obj['id'];
  console.log(obj);
});

(async function() {
  try {
    await sequelize.sync({ force: true });
    const req = { body: { email: 'example@gmail.com' } };
    await User.create({ ...req.body, totp_active: 'N', is_active: 'Y' });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
