import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { Category } from './category';
import { Film } from './film';

class FilmCategory extends Model {
  public FilmID!: number;
  public CategoryID!: number;
  public Last_Update!: Date;
}
FilmCategory.init(
  {
    FilmID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Film',
        key: 'ID',
      },
      onDelete: 'restrict',
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Category',
        key: 'ID',
      },
      onDelete: 'cascade',
    },
    Last_Update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Film_Category' },
);

export { FilmCategory, Film, Category };
