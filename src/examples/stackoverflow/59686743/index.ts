import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../db';
import assert from 'assert';

class TitanJob extends Model {}
TitanJob.init(
  {
    titanId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'titanJob', timestamps: true },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const datas = [
      { titanId: '1', name: 'programmer' },
      { titanId: '2', name: 'teacher' },
    ];
    const jobs = await TitanJob.bulkCreate(datas);
    assert.deepEqual(
      jobs.map((job) => ({ titanId: job.id, name: job.name })),
      datas,
      'Should bulk create programmer and teacher datas',
    );
    const rval = await TitanJob.upsert({ titanId: '1', name: 'driver' }, { returning: true });
    assert.equal(rval[0].titanId, '1', 'Should update the row which titanId is "1"');
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
