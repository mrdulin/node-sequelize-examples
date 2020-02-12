import { sequelize } from '../../db';
import { Model, DataTypes, Op } from 'sequelize';
import assert from 'assert';

class MyEntity extends Model {}
MyEntity.init(
  {
    config: DataTypes.JSONB,
  },
  { sequelize, modelName: 'MyEntity' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await MyEntity.create({
      config: {
        rewards: {
          policyA: [
            { enforcedDate: 'some-date', anotherKey: 'some-val' },
            { enforcedDate: 'some-date-2', anotherKey: 'some-val-2' },
          ],
        },
      },
    });

    const rval = await MyEntity.findAndCountAll({
      where: {
        config: {
          [Op.contains]: {
            rewards: {
              policyA: [{ enforcedDate: 'some-date' }],
            },
          },
        },
      },
    });
    assert(rval.count === 1, 'The count of entities should be equal 1');
    console.log('entity.config:', rval.rows[0]['config']);
    const rval2 = await MyEntity.findAndCountAll({
      where: {
        config: {
          [Op.contains]: {
            rewards: {
              policyA: [{ enforcedDate: 'some' }],
            },
          },
        },
      },
    });
    assert(rval2.count === 0, 'The count of entities should be 0');
    console.log('rval2:', rval2);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
