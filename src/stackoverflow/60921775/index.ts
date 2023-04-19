import { sequelize } from '../../examples/db';
import { Model, DataTypes, BelongsToManyAddAssociationMixin } from 'sequelize';

class User extends Model {
  public getFriends!: BelongsToManyAddAssociationMixin<User, string>;
}
User.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'users' },
);

User.belongsToMany(User, { as: 'friends', through: 'user_friends' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    const friendsOfUser1 = [{ name: 'james' }, { name: 'elsa' }];
    const friendsOfUser2 = [{ name: 'jane' }, { name: 'mike' }];
    await User.bulkCreate(
      [
        { name: 'jeremy', friends: friendsOfUser1 },
        { name: 'lynne', friends: friendsOfUser2 },
      ],
      { include: [{ model: User, as: 'friends' }] },
    );
    const jeremy = await User.findOne({ where: { name: 'jeremy' } });
    const firendsOfJeremy = await jeremy.getFriends();
    console.log(firendsOfJeremy);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
