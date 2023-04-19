import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import { sequelize } from '../../examples/db';

const Users: any = sequelize.define(
  'users',
  {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_password: {
      type: DataTypes.STRING,
      validate: { is: /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{6,16})$/ },
    },
  },
  { freezeTableName: true },
);

Users.beforeCreate(function(user, options) {
  return cryptPassword(user.user_password)
    .then((success) => {
      user.user_password = success;
    })
    .catch((err) => console.log(err));
});

function cryptPassword(password) {
  console.log('cryptPassword ' + password);
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
}

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Users.create({ user_password: 'Abc123456' });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
