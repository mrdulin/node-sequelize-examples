import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import assert from 'assert';

class Transaction extends Model {}
Transaction.init(
  {
    recordId: {
      unique: true,
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'transactions' },
);

class TransactionDetail extends Model {}
TransactionDetail.init(
  {
    amount: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'transaction_details' },
);

Transaction.hasMany(TransactionDetail, { foreignKey: 'recordId', sourceKey: 'recordId' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    await Transaction.create(
      { recordId: '6688', transaction_details: [{ amount: 60 }, { amount: 100 }, { amount: 160 }] },
      { include: [TransactionDetail] },
    );

    const rval = await Transaction.findOne({ where: { recordId: '6688' }, include: [TransactionDetail] });
    console.log(rval.dataValues);
    assert.equal(rval.transaction_details.length, 3, 'transaction details count should equal 3');
    const transactionDetailsDataValues = rval.transaction_details.map((d) => d.dataValues);
    console.log('transactionDetailsDataValues: ', transactionDetailsDataValues);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
