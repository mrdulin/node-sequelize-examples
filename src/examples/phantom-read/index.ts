import Sequelize, { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class TblMVCC extends Model {}
TblMVCC.init({ ival: DataTypes.INTEGER }, { sequelize, modelName: 'tbl_mvcc' });

(async function test() {
  // client 1 transaction
  const tx1 = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });
  // client 2 transaction
  const tx2 = await sequelize.transaction();
  try {
    await sequelize.sync({ force: true });
    await TblMVCC.bulkCreate([
      { id: 4, ival: 4 },
      { id: 5, ival: 5 },
    ]);
    const tx1QueryRval1 = await TblMVCC.findAll({
      transaction: tx1,
      where: { id: { [Sequelize.Op.gt]: 3, [Sequelize.Op.lt]: 10 } },
      raw: true,
    });
    console.log('tx1QueryRval1: ', tx1QueryRval1); // [ { id: 4, ival: 4 }, { id: 5, ival: 5 } ]
    const tx2InsertRval = await TblMVCC.create({ id: 6, ival: 6 }, { transaction: tx2, raw: true });
    console.log('tx2InsertRval: ', tx2InsertRval);
    await tx2.commit();
    const tx1QueryRval2 = await TblMVCC.findAll({
      transaction: tx1,
      where: { id: { [Sequelize.Op.gt]: 3, [Sequelize.Op.lt]: 10 } },
      raw: true,
    });
    console.log('tx1QueryRval2: ', tx1QueryRval2); // [ { id: 4, ival: 4 }, { id: 5, ival: 5 }, { id: 6, ival: 6 } ]
    await tx1.commit();
  } catch (error) {
    await tx1.rollback();
    await tx2.rollback();
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
