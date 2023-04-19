import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class Communication extends Model {}
Communication.init(
  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    message_uuid: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  { sequelize, tableName: 'communications' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Communication.create({ firstname: 'teresa', lastname: 'teng', age: 32, message_uuid: 123 });
    // test
    await Communication.bulkCreate([{ firstname: 'teresa', lastname: 'teng', age: 32, message_uuid: 123 }], {
      ignoreDuplicates: true,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
