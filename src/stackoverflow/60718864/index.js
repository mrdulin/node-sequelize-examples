/* eslint-disable @typescript-eslint/camelcase */
import { sequelize } from '../../examples/db';
import Sequelize, { Model } from 'sequelize';

class Contact extends Model {}
Contact.init(
  {
    contact_id: {
      type: Sequelize.INTEGER,
      field: 'contact_id',
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      field: 'first_name',
    },
    created_at: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updated_at: {
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  },
  { sequelize, modelName: 'contacts', timestamps: false },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    await Contact.findAll();
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
