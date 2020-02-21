import { sequelize } from '../../db';
import Sequelize from 'sequelize';

const User = sequelize.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  },
);

const UserSources = sequelize.define(
  'user_source',
  {
    abcNews: {
      type: Sequelize.BOOLEAN,
    },
    bbcNews: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    tableName: 'user_sources',
  },
);

UserSources.belongsTo(User);

// User.UserSources = User.hasOne(UserSources);
// User.hasOne(UserSources);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // 1. User.UserSources = User.hasOne(UserSources);
    // await User.create(
    //   {
    //     email: 'example@gmail.com',
    //     password: '123',
    //     user_source: {
    //       abcNews: true,
    //       bbcNews: true,
    //     },
    //   },
    //   {
    //     include: [
    //       {
    //         association: User.UserSources,
    //       },
    //     ],
    //   },
    // );

    // 2. User.hasOne(UserSources);
    // await User.create(
    //   {
    //     email: 'example@gmail.com',
    //     password: '123',
    //     user_source: {
    //       abcNews: true,
    //       bbcNews: true,
    //     },
    //   },
    //   {
    //     include: [UserSources],
    //   },
    // );

    // 3. UserSources.belongsTo(User);
    await UserSources.create(
      {
        abcNews: true,
        bbcNews: true,
        user: {
          email: 'example@gmail.com',
          password: '123',
        },
      },
      {
        include: [User],
      },
    );
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
