import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  password!: string;
  name!: string;
}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'users',
    hooks: {
      beforeCreate: (user: User) => {
        return bcrypt
          .genSalt(10)
          .then((salt) => {
            return bcrypt
              .hash(user.password, salt)
              .then((hashedPassword) => {
                user.password = hashedPassword;
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      },
    },
  },
);

(async function() {
  try {
    await sequelize.sync({ force: true });
    await User.create({ name: 'ab', email: 'test@gmail.com', password: '123456' });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
