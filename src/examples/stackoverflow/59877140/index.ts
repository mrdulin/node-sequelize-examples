import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import assert from 'assert';

class SomeEntity extends Model {
  public id!: number;
  public result!: any;
  public result_success!: boolean;
}
SomeEntity.init(
  {
    result: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    result_success: {
      type: DataTypes.VIRTUAL,
      get(this: SomeEntity) {
        return this.getDataValue('result').success;
      },
    },
  },
  { sequelize, modelName: 'SomeEntities' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    const entity = await SomeEntity.create({
      result: {
        score: { scaled: 1, raw: 8, min: 7, max: 10 },
        success: true,
        completion: true,
        duration: '2H30M',
      },
    });
    assert(entity.result_success, 'The value of the virtual field result_success should be truthy');
    console.log('entity.result_success: ', entity.result_success);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
