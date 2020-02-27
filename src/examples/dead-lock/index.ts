import { sequelize } from '../db';
import Sequelize, { Model, DataTypes } from 'sequelize';

class Account extends Model {}
Account.init(
  {
    acctnum: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize, modelName: 'accounts' },
);

(async function testDeadLock(skip = false) {
  if (skip) {
    return;
  }
  console.log('test dead lock');
  const tx1 = await sequelize.transaction();
  const tx2 = await sequelize.transaction();
  // set lock_timeout, otherwise, the application will hang due to the dead lock
  await sequelize.query("SET LOCAL lock_timeout = '10s'", { transaction: tx1 });
  await sequelize.query("SET LOCAL lock_timeout = '10s'", { transaction: tx2 });
  const tid1 = await sequelize.query('select txid_current();', { transaction: tx1 });
  const tid2 = await sequelize.query('select txid_current();', { transaction: tx2 });
  console.log('tid1: ', tid1);
  console.log('tid2: ', tid2);
  try {
    await sequelize.sync({ force: true });
    await Account.bulkCreate([{ acctnum: 11111 }, { acctnum: 22222 }]);

    await Account.update(
      { balance: Sequelize.literal('balance + 100.00') },
      { where: { acctnum: 11111 }, transaction: tx1 },
    );
    await Account.update(
      { balance: Sequelize.literal('balance + 100.00') },
      { where: { acctnum: 22222 }, transaction: tx2 },
    );
    await Account.update(
      { balance: Sequelize.literal('balance - 100.00') },
      { where: { acctnum: 11111 }, transaction: tx2 },
    );
    await Account.update(
      { balance: Sequelize.literal('balance - 100.00') },
      { where: { acctnum: 22222 }, transaction: tx1 },
    );
    await tx1.commit();
    await tx2.commit();
  } catch (error) {
    console.log(error);
    await tx1.rollback();
    await tx2.rollback();
  } finally {
    await sequelize.close();
  }
})(true);
