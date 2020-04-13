import Sequelize from 'sequelize';
import { sequelize } from '../../../db';

export default class Author extends Sequelize.Model {}
Author.init(
  {
    firstName: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
  },
  { sequelize, modelName: 'authors' },
);
