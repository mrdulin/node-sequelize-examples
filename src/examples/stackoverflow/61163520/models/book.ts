import Sequelize from 'sequelize';
import { sequelize } from '../../../db';

export default class Book extends Sequelize.Model {}
Book.init(
  {
    title: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
  },
  { sequelize, modelName: 'books' },
);
