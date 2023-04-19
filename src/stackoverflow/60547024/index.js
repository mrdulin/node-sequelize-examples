import { sequelize } from '../../examples/db';
import Sequelize, { Op } from 'sequelize';

const Blogpost = sequelize.define(
  'blogposts',
  {
    blogId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.TEXT,
    content: Sequelize.TEXT,
    posted: Sequelize.TEXT,
    imageFile: Sequelize.TEXT,
  },
  {
    timestamps: false,
  },
);

const Account = sequelize.define(
  'accounts',
  {
    personId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    userPassword: Sequelize.TEXT,
  },
  {
    timestamps: false,
  },
);

Blogpost.belongsTo(Account, { foreignKey: 'userId', foreignKeyConstraint: true });

function getUsernameById(userId, callback) {
  return Blogpost.findOne({
    where: {
      userId: {
        [Op.eq]: userId,
      },
    },
    include: [{ model: Account, attributes: ['username'] }],
  })
    .then((blogpost) => blogpost.account.username)
    .then(function(username) {
      callback(username, []);
    })
    .catch(function(errors) {
      console.log(errors);
      callback(null, errors);
    });
}

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Blogpost.create(
      {
        title: 'some title',
        content: 'some content',
        posted: 'some posted',
        imageFile: 'dog.jpg',
        account: { username: 'steam', email: 'example@gmail.com', userPassword: '123456' },
      },
      { include: [Account] },
    );

    // test
    await getUsernameById(1, (username) => {
      console.log('username: ', username);
    });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
