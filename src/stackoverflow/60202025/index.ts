import { sequelize } from '../../examples/db';
import { Model, DataTypes, Op } from 'sequelize';

class Question extends Model {}
Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question_text: DataTypes.STRING,
    level_id: DataTypes.INTEGER,
    age_group_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'question', timestamps: true },
);

class Option extends Model {}
Option.init(
  {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    answer_text: DataTypes.STRING,
    answer_is_correct: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'option', timestamps: true },
);

Question.hasMany(Option, { foreignKey: 'question_id', sourceKey: 'id' });
Option.belongsTo(Question, { foreignKey: 'question_id', targetKey: 'id' });

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // test
    await Question.create(
      {
        question_text: 'this is the question',
        level_id: 1,
        age_group_id: 2,
        status: 1,
        options: [
          {
            answer_text: 'this is the option',
            answer_is_correct: 1,
          },
        ],
      },
      { include: [Option] },
    );
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
