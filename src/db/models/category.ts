import { Model, DataTypes, BelongsToManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../db';
import { Film } from './film_category';

class Category extends Model {
  public ID!: number;
  public Name!: string;
  public Last_Update!: Date;
  public getFilms!: BelongsToManyGetAssociationsMixin<Film>;
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
