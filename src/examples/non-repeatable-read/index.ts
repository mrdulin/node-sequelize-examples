import { sequelize } from '../db';
import Sequelize, { Model, DataTypes } from 'sequelize';

class TblMVCC extends Model {}
TblMVCC.init(
  {
    ival: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'tbl_mvcc' },
);

(async function test() {
  // client 1 transaction
  const tx1 = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });
  // client 2 transaction
  const tx2 = await sequelize.transaction();
  try {
    await sequelize.sync({ force: true });
    await TblMVCC.create({ ival: 1 });

    const tx1QueryRval1 = await TblMVCC.findByPk(1, { transaction: tx1 });
    console.log('tx1QueryRval1: ', tx1QueryRval1.dataValues); // tx1QueryRval1:  { id: 1, ival: 1 }

    const tx2UpdateRval = await TblMVCC.update({ ival: 10 }, { where: { id: 1 }, transaction: tx2 });
    await tx2.commit();
    console.log('tx2UpdateRval: ', tx2UpdateRval); // tx2UpdateRval:  [ 1 ]
    const tx1QueryRval2 = await TblMVCC.findByPk(1, { transaction: tx1 });
    console.log('tx1QueryRval2: ', tx1QueryRval2.dataValues); // tx1QueryRval2:  { id: 1, ival: 10 }
    await tx1.commit();
  } catch (error) {
    await tx1.rollback();
    await tx2.rollback();
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
