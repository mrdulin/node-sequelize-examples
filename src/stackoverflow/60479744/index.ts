import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init({}, { sequelize, modelName: 'users' });

class Teacher extends Model {}
Teacher.init({}, { sequelize, modelName: 'teachers' });

class Reply extends Model {}
Reply.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'replies' },
);

class Message extends Model {}
Message.init(
  {
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'messages' },
);

const MessageBelongsToUser = Message.belongsTo(User, { foreignKey: 'userId' });
const MessageBelongsToTeacher = Message.belongsTo(Teacher, { foreignKey: 'teacherId' });
Message.hasMany(Reply, { foreignKey: 'messageId' });
Reply.belongsTo(Message, { foreignKey: 'messageId' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    await Message.create(
      {
        title: 'messsage title',
        message: 'message content',
        user: {},
        teacher: {},
        replies: [{ id: 1 }, { id: 2 }],
      },
      { include: [{ association: MessageBelongsToUser }, Reply, { association: MessageBelongsToTeacher }] },
    );

    const userId = 1;
    const rval = await Message.findAll({ include: [{ model: Reply }], where: { userId }, raw: true });
    console.log('rval: ', rval);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
