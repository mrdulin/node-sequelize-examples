import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import { Sequelize } from '../../../db/models/index-tranditional';

class Enterprise extends Model {}
Enterprise.init(
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'Enterprise' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const csvRecords = [
      { name: 'Google', address: 'US' },
      { name: 'Stackoverflow', address: 'US' },
      { name: 'Facebook' },
    ];

    // const csvRecordValues = csvRecords.map((record) => Object.values(record));
    // const query = `
    //   INSERT INTO "Enterprise" (name, address)
    //   VALUES ${csvRecordValues.map(() => '(?)').join(',')}
    //   ON CONFLICT (address) DO NOTHING;
    // `;
    // await sequelize.query({ query, values: csvRecordValues }, { type: Sequelize.QueryTypes.INSERT });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
