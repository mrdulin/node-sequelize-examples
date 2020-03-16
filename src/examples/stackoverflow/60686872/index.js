import { sequelize as seq } from '../../db';
import Sequelize from 'sequelize';

const User = seq.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    isDeselected: {
      type: Sequelize.BOOLEAN,
    },
  },
  { timestamps: false },
);

const Group = seq.define(
  'group',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    permissions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  },
  { timestamps: false },
);

const UserGroup = seq.define('UserGroup', {});

Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });

(async function test() {
  try {
    await seq.sync({ force: true });
    // seed
    await User.bulkCreate(
      [
        { login: 'a', password: '123', groups: [{ name: 'group a' }, { name: 'group b' }] },
        { login: 'b', password: '321', groups: [{ name: 'group c' }, { name: 'group d' }] },
      ],
      { include: [Group] },
    );

    // test
    const userIds = [1, 2];
    const groupId = 3;
    const user = await User.findOne({ where: { id: userIds } });
    const group = await Group.findOne({ where: { id: groupId } });
    const result = await user.addGroup(group);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await seq.close();
  }
})();
