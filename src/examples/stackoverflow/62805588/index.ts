import { sequelize } from '../../db';
import { Model, DataTypes, Op } from 'sequelize';

class Submission extends Model {}
Submission.init(
  {
    tags: DataTypes.ARRAY(DataTypes.STRING),
  },
  { sequelize, tableName: 'submissions' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Submission.bulkCreate([
      { tags: ['football', 'basketball'] },
      { tags: ['football', 'hockey'] },
      { tags: ['a', 'b'] },
    ]);

    // test
    const queries = ['football', 'baseball'];
    const data = await Submission.findAll({
      where: {
        tags: {
          [Op.overlap]: queries,
        },
      },
      raw: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
