import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Foo extends Model {
  public firstname!: string;
  public lastname!: string;
  get fullName() {
    return this.firstname + ' ' + this.lastname;
  }

  set fullName(value) {
    const names = value.split(' ');
    this.setDataValue('firstname', names.slice(0, -1).join(' '));
    this.setDataValue('lastname', names.slice(-1).join(' '));
  }
}

Foo.init(
  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'foo',
  },
);

export { sequelize, Foo };
