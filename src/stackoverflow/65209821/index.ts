import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../examples/db';

export class Exams extends Model {}

export class ExamsModel {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deleted!: boolean;
}

Exams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idExam',
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    deletedAt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Exams',
    modelName: 'Exams',
    schema: 'operation',
    underscored: false,
    freezeTableName: true, // not pluralizes
  },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const data = await Exams.findAll();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
