import { sequelize } from '../../db';
import { Model, DataTypes, QueryTypes } from 'sequelize';

class Form extends Model {}
Form.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    collaborator: DataTypes.ARRAY(DataTypes.JSONB),
  },
  { sequelize, tableName: 'forms' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Form.bulkCreate([
      { collaborator: [{ id: 1, name: 'teresa' }] },
      { collaborator: [{ id: 2, name: 'teng' }] },
      { collaborator: [{ id: 3, name: 'slideshowp2' }] },
      {
        collaborator: [
          { id: 4, name: 'John' },
          { id: 5, name: 'Tim' },
        ],
      },
    ]);

    // test
    const data = await sequelize.query(
      `
        SELECT id, collaborator
        FROM   forms f, jsonb_array_elements(to_jsonb(f.collaborator)) obj
        WHERE  obj->>'name' = 'John';
    `,
      { type: QueryTypes.SELECT },
    );
    console.log(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
