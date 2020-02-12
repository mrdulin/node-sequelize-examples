import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../db';
class User extends Model {}
class EmojiPost extends Model {
  public user!: number;
  public emoji_type!: number;
}
class Emoji extends Model {}

User.init({}, { sequelize, modelName: 'User' });
EmojiPost.init({}, { sequelize, modelName: 'EmojiPost' });
Emoji.init(
  {
    emoji_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { sequelize, modelName: 'Emoji' },
);

// EmojiPost.belongsTo(User, { foreignKey: 'user' });
// EmojiPost.belongsTo(Emoji, { foreignKey: 'emoji_type' });

EmojiPost.belongsTo(User, { foreignKey: { name: 'user', allowNull: false } });
EmojiPost.belongsTo(Emoji, { foreignKey: { name: 'emoji_type', allowNull: false } });

User.hasMany(EmojiPost, { foreignKey: 'user', onDelete: 'cascade' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    await User.create();
    await Emoji.create();
    const data = { user: 1, emoji_type: 1 };
    await EmojiPost.create(data);

    const data2 = { user: null, emoji_type: null };
    await EmojiPost.create(data2);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
