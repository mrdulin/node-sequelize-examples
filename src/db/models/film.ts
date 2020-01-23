import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Film extends Model {
  public ID!: number;
  public LanguageID!: number;
  public Title!: string;
  public Description!: string;
  public Release_Year!: number;
  public Rental_Duration!: number;
  public Rental_Date!: number;
  public Length!: number;
  public Replacement_Cost!: number;
  public Rating!: number;
  public Last_Update!: Date;
  public Special_Features!: string;
  public Fulltext!: string;
}
Film.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    LanguageID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Language',
        key: 'ID',
      },
      onDelete: 'restrict',
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Release_Year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Rental_Duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Rental_Date: {
      type: DataTypes.DECIMAL(19, 0),
      allowNull: false,
    },
    Length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Replacement_Cost: {
      type: DataTypes.DECIMAL(19, 0),
      allowNull: false,
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Last_Update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Special_Features: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fulltext: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Film' },
);

export { Film };
