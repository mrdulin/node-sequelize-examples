import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Category extends Model {
  public ID!: number;
  public Name!: string;
  public Last_Update!: Date;
}
Category.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Last_Update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Category' },
);

export { Category };
