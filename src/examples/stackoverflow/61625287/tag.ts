import { sequelize } from '../../db';
import Sequelize, { Model, DataTypes } from 'sequelize';

class Tag extends Model {
  id!: string;
  title!: string;
}
Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize, modelName: 'tag' },
);

export default Tag;
