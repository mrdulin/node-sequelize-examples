import { sequelize } from '../../db';
import Sequelize, { DataTypes, Model, Op } from 'sequelize';

class Deal extends Model {}
Deal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { sequelize, modelName: 'deal', tableName: 'deals' },
);

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { sequelize, modelName: 'user', tableName: 'users' },
);

Deal.belongsToMany(User, { through: 'UserDeal' });
User.belongsToMany(Deal, { through: 'UserDeal' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Deal.bulkCreate([{ id: 1, users: [{ id: 1 }, { id: 2 }] }, { id: 2 }, { id: 3 }], {
      include: [{ model: User }],
    });

    // test
    const r = await Deal.findAll({
      where: {
        '$users->UserDeal.userId$': {
          [Op.and]: [1, 2],
        },
      },
      include: [
        {
          model: User,
        },
      ],
    });
    console.log(r);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
