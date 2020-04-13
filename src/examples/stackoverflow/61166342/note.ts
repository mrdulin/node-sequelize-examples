import { sequelize as sequelizeInstance } from '../../db';
import { Model, DataTypes } from 'sequelize';

const config = {
  tableName: 'notes',
  sequelize: sequelizeInstance,
};

class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public categoryId!: number;
}
Note.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  config,
);

export default Note;
