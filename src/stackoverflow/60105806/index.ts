import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class IotNode extends Model {}
IotNode.init(
  {
    typeId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    devEui: DataTypes.STRING,
    application_name: DataTypes.STRING,
  },
  { sequelize, modelName: 'iot_nodes' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const datas = [
      {
        typeId: 5,
        devEui: '0094E796CBFCFEF9',
        application_name: 'Pressure No.10',
        createdAt: '2020-02-05T08:07:17.000Z',
        updatedAt: '2020-02-05T08:07:17.000Z',
      },
    ];
    await IotNode.bulkCreate(datas, { updateOnDuplicate: ['devEui'] });
    await IotNode.bulkCreate(datas, { updateOnDuplicate: ['devEui'] });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
