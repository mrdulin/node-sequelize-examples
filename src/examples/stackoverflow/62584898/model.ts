import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';
import ILocation, { ICoordinates } from './interfaces';

export class Location extends Model implements ILocation {
  public id!: string;
  public coordinates!: ICoordinates;
  public description: string | undefined | null;
  public name!: string;
  public type_id!: number;
  public owner!: string;
}

Location.init(
  {
    id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
    coordinates: { type: DataTypes.GEOMETRY('POINT', 4326), allowNull: false },
    description: { type: DataTypes.TEXT },
    name: { type: DataTypes.STRING, allowNull: false },
    type_id: { type: DataTypes.NUMBER, allowNull: false },
    owner: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: 'location',
    sequelize,
    timestamps: false,
  },
);
