import { sequelize } from '../../db';
import { DataTypes, Model } from 'sequelize';
import faker from 'faker';

class Desc extends Model {}
Desc.init(
  {
    desc_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'descs', modelName: 'desc' },
);

class Item extends Model {}
Item.init(
  {
    desc_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    source_customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'items', modelName: 'item' },
);

class Contact extends Model {}
Contact.init(
  {
    contact_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    source_contact_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tenant_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, tableName: 'contacts', modelName: 'contact' },
);

Desc.hasMany(Item, { foreignKey: 'desc_id' });
Item.belongsTo(Desc, { foreignKey: 'desc_id' });

(async function() {
  try {
    await sequelize.sync({ force: true });
    // seed
    const tenantId = '52639d96-d3a3-46dc-b65a-fc716315bd66';
    const descsMatched = Array.from({ length: 11 }).map((_) => ({ desc_id: faker.random.uuid(), tenant_id: tenantId }));
    const descsUnmatched = Array.from({ length: 26340 }).map((_) => ({
      desc_id: faker.random.uuid(),
      tenant_id: faker.random.uuid(),
    }));
    await Desc.bulkCreate([...descsMatched, ...descsUnmatched]);

    const itemsUnmatched = Array.from({ length: 2400 * 1000 }).map((_) => ({}));

    const contactsMatched = Array.from({ length: 260 * 1000 }).map((_) => ({
      contact_Id: faker.random.uuid(),
      text: 'T',
      tenant_id: tenantId,
    }));
    const contactsUnmatched = Array.from({ length: 690 * 1000 }).map((_) => ({
      contact_Id: faker.random.uuid(),
      text: 'F',
      tenant_id: faker.random.uuid(),
    }));
    await Contact.bulkCreate([...contactsMatched, ...contactsUnmatched]);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
