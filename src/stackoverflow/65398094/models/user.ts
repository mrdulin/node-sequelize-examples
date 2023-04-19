import { sequelize } from '../../../examples/db';
import { DataTypes, Model } from 'sequelize';

export class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, tableName: 'users' },
);
