import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';
import assert from 'assert';

class Users extends Model {}
Users.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'Users' },
);

class Websites extends Model {}
Websites.init(
  {
    url: DataTypes.STRING,
  },
  { sequelize, modelName: 'Websites' },
);

Users.belongsToMany(Websites, { through: 'UserWebsites', as: 'Websites', timestamps: false });
Websites.belongsToMany(Users, { through: 'UserWebsites', as: 'Users', timestamps: false });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const websitesOfUser1 = [{ url: 'twitter' }, { url: 'stackoverflow' }];
    const websitesOfUser2 = [{ url: 'github' }, { url: 'google' }];
    // seed
    await Users.bulkCreate(
      [
        { id: 1, Websites: websitesOfUser1 },
        { id: 2, Websites: websitesOfUser2 },
      ],
      { include: [{ model: Websites, as: 'Websites' }] },
    );

    // test
    const user = await Users.findOne({
      where: { id: 1 },
      include: [{ model: Websites, as: 'Websites' }],
    });
    assert.equal(user.Websites.length, websitesOfUser1.length, 'user 1 has two websites');
    const websitesDataValues = user.Websites.map((website) => website.dataValues);
    console.log('websitesDataValues: ', websitesDataValues);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
