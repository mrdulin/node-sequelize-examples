import { sequelize } from '../../db';
import { DataTypes, Model } from 'sequelize';
import faker from 'faker';

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'users', modelName: 'user' },
);

class Topic extends Model {}
Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  { sequelize, tableName: 'topics', modelName: 'topic' },
);

class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Topic,
        key: 'id',
      },
      allowNull: false,
    },
    content: DataTypes.TEXT,
    from_user_id: {
      references: {
        model: User,
        key: 'id',
      },
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_user_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: 'comments', modelName: 'comment' },
);

User.hasMany(Topic, { foreignKey: 'user_id' });
Topic.belongsTo(User, { foreignKey: 'user_id' });

Topic.hasMany(Comment, { foreignKey: 'topic_id' });
Comment.belongsTo(Topic, { foreignKey: 'topic_id' });

User.hasMany(Comment, { foreignKey: 'from_user_id' });
Comment.belongsTo(User, { foreignKey: 'from_user_id', as: 'from_user' });
User.hasMany(Comment, { foreignKey: 'to_user_id' });
Comment.belongsTo(User, { foreignKey: 'to_user_id', as: 'to_user' });

(async function() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.bulkCreate(
      [
        {
          id: 1,
          email: faker.internet.email(),
          topics: [
            {
              id: 1,
              title: faker.lorem.sentence(),
              content: faker.lorem.paragraph(),
              comments: [
                { id: 1, content: faker.lorem.sentence(), from_user_id: 2 },
                { id: 2, content: faker.lorem.sentence(), from_user_id: 3 },
              ],
            },
            {
              id: 2,
              title: faker.lorem.sentence(),
              content: faker.lorem.paragraph(),
              comments: [
                { id: 3, content: faker.lorem.sentence(), from_user_id: 3 },
                { id: 4, content: faker.lorem.sentence(), from_user_id: 2, to_user_id: 3 },
              ],
            },
          ],
        },
        { id: 2, email: faker.internet.email() },
        { id: 3, email: faker.internet.email() },
      ],
      { include: [{ model: Topic, include: [{ model: Comment }] }] },
    );
  } catch (error) {
    console.log(error);
  } finally {
    if (require.main === module) {
      await sequelize.close();
    }
  }
})();

export { User, Topic, Comment };
