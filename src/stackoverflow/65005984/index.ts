import { sequelize } from '../../examples/db';
import Sequelize, { DataTypes, Model } from 'sequelize';

class Table1 extends Model {}
Table1.init(
  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    documentNo: DataTypes.INTEGER,
    paperID: DataTypes.INTEGER,
  },
  { sequelize, tableName: 'table1' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Table1.bulkCreate([
      { id: 1, date: new Date('2015/10/15'), amount: 500, documentNo: 1234, paperID: 34 },
      { id: 1, date: new Date('2015/10/16'), amount: 100, documentNo: 1332, paperID: 33 },
      { id: 2, date: new Date('2015/10/13'), amount: 200, documentNo: 1302, paperID: 21 },
      { id: 2, date: new Date('2015/10/12'), amount: 400, documentNo: 1332, paperID: 33 },
      { id: 3, date: new Date('2015/11/23'), amount: 500, documentNo: 1332, paperID: 43 },
    ]);
    // test 1
    const data1 = await Table1.findAll({
      where: Sequelize.literal(`
        NOT EXISTS (
            SELECT * FROM table1 historyTable2
            WHERE historyTable2.id = "Table1".id AND
            historyTable2.date > "Table1".date
        )`),
      raw: true,
    });
    console.log(data1);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
