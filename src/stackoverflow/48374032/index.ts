import { sequelize } from '../../examples/db';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  public date_of_birth!: Date;
  public name!: string;
}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    date_of_birth: {
      get(this: User): Date {
        return new Date(this.getDataValue('date_of_birth'));
      },
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
        notEmpty: true,
      },
    },
  },
  { sequelize, modelName: 'user' },
);
