import { sequelize } from '../../examples/db';
import { Model, DataTypes, Op } from 'sequelize';

class TableA extends Model {}
TableA.init(
  {
    external_data: DataTypes.JSONB,
  },
  {
    sequelize,
    modelName: 'table_a',
    defaultScope: {
      attributes: { exclude: ['external_data'] },
    },
    scopes: {
      exclude(subField) {
        return {
          where: {
            external_data: {
              [subField]: {
                [Op.eq]: null,
              },
            },
          },
        };
      },
    },
  },
);

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // seed
    await TableA.bulkCreate([
      { external_data: { a: 1, b: 2, c: 3 } },
      { external_data: { a: 10, c: 30 } },
      { external_data: { a: 100 } },
    ]);
    // test
    // test case 1: exclude subfield "b"
    const result1 = await TableA.scope({ method: ['exclude', 'b'] }).findAll({ raw: true });
    console.log('result1:', result1);
    // test case 2: exclude subfield "c"
    const result2 = await TableA.scope({ method: ['exclude', 'c'] }).findAll({ raw: true });
    console.log('result2:', result2);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
