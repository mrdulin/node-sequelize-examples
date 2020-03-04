import { sequelize } from '../../db';
import { DataTypes } from 'sequelize';
import assert from 'assert';

const Test = sequelize.define(
  'Test',
  {
    testId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isInt: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: 'tests' },
);

const User = sequelize.define(
  'User',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isInt: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: 'users' },
);

Test.belongsTo(User, { as: 'User', foreignKey: 'userId', targetKey: 'userId' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Test.create(
      { username: 'vans', User: { username: 'nike', createdAt: new Date() } },
      { include: [{ model: User, as: 'User' }] },
    );

    // test
    const result = await Test.findAll({
      limit: 1,
      include: [
        {
          model: User,
          as: 'User',
        },
      ],
    });
    console.log(result);
    assert.equal(result.length, 1, 'should query one data row');
    assert.equal(result[0].testId, 1);
    assert.equal(result[0].username, 'vans');
    assert.equal(result[0].userId, 1);
    assert.equal(result[0].User.userId, 1);
    assert.equal(result[0].User.username, 'nike');
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
