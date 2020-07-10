import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class Account extends Model {}
Account.init(
  {
    transactionId: {
      type: DataTypes.UUIDV1,
      unique: true,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'accounts', modelName: 'account' },
);

export { Account, sequelize };
