import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../db';
import faker from 'faker';

class Item extends Model {}
Item.init(
  {
    tenant_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'items', modelName: 'item', indexes: [{ name: 'tenant_id_index', fields: ['tenant_id'] }] },
);

(async function() {
  try {
    await sequelize.sync({ force: true });
    // seed
    // https://stackoverflow.com/questions/62949310/how-to-bulkcreate-millions-of-levels-of-data
    for (let i = 0; i < 400; i++) {
      const items = Array.from({ length: 10000 }).map((_) => ({ tenant_id: faker.random.uuid() }));
      await Item.bulkCreate(items, { benchmark: true, returning: false });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
