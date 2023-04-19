import { sequelize } from '../../examples/db';
import { Model, DataTypes, BelongsToManyGetAssociationsMixin, BelongsToManyCountAssociationsMixin } from 'sequelize';

class User extends Model {}
User.init(
  {
    firstName: DataTypes.STRING,
  },
  { sequelize, modelName: 'User' },
);

class Week extends Model {
  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
}
Week.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: 'Week' },
);

class Roster extends Model {}
Roster.init(
  {
    weekId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
  },
  { sequelize, modelName: 'Roster' },
);

User.belongsToMany(Week, { through: Roster, foreignKey: { name: 'weekId' } });
Week.belongsToMany(User, { through: Roster, foreignKey: { name: 'userId', allowNull: true } });

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // seed
    const week = await Week.create(
      {
        date: new Date(),
        Users: [
          { firstName: 'james' },
          { firstName: 'elsa' },
          { firstName: 'tim' },
          { firstName: 'lee' },
          { firstName: 'jasmine' },
        ],
      },
      { include: [User] },
    );
    // test
    const count = await week.countUsers();
    console.log('count:', count);
    const users = await week.getUsers();
    console.log('users count:', users.length);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
