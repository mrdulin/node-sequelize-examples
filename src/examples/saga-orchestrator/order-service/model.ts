import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class Order extends Model {}
Order.init(
  {
    transactionId: {
      type: DataTypes.UUIDV1,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'orders', modelName: 'order' },
);

export { Order, sequelize };
