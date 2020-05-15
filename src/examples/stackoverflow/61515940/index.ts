import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapterId: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'User' },
);

class Chapter extends Model {}
Chapter.init(
  {
    chapterId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    chapterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isChapterLocal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Chapter' },
);

User.belongsTo(Chapter, { foreignKey: 'chapterId', targetKey: 'chapterId', as: 'chapter' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.create(
      {
        userId: '1',
        email: 'example@gmail.com',
        firstName: 'Lin',
        lastName: 'Du',
        password: '123',
        chapter: {
          chapterId: '1',
          chapterName: 'ok',
          isChapterLocal: false,
        },
      },
      { include: [{ model: Chapter, as: 'chapter' }] },
    );
    // test
    const userData = await User.findAll({
      include: [{ model: Chapter, as: 'chapter' }],
      raw: true,
    });
    console.log('userData:', userData);
  } catch (error) {
    console.log(error);
  } finally {
    sequelize.close();
  }
})();
