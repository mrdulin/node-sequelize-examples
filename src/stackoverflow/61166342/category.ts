import { sequelize as sequelizeInstance } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

const config = {
  tableName: 'categories',
  sequelize: sequelizeInstance,
};

class Category extends Model {
  public id!: number;
  public title!: string;
  public color!: number;
  public categoryId!: number;
}
Category.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: DataTypes.STRING,
    color: DataTypes.INTEGER,
  },
  config,
);

export default Category;
