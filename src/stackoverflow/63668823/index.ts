import { sequelize } from '../../examples/db';
import { Model, DataTypes, QueryTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';

class Data extends Model {}
Data.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ext_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  { sequelize, tableName: 'data' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const FILE_PATH = path.join(__dirname, './apps.json');
    const columns = ['name', 'description', 'ext_id'];
    const myFile = fs.readFileSync(FILE_PATH, { encoding: 'utf-8' });
    const appData = await sequelize.query(
      `
        with app_json(doc) as (
            values ('${myFile}'::json)
        )
        insert into data (${columns.join(', ')})
        select ${columns.join(', ')}
        from app_json l
            cross join lateral json_populate_recordset(null::data, doc) as p
        on conflict (ext_id) do update
            set ${columns.map((col) => `${col} = EXCLUDED.${col}`).join(', ')}
        returning ext_id;
    `,
      { type: QueryTypes.INSERT },
    );
    console.log(appData);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
