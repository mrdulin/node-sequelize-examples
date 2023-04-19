import Sequelize from 'sequelize';
import { sequelize } from '../../../examples/db';

export default class AuthorBook extends Sequelize.Model {}
AuthorBook.init(
  {
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'authorbooks' },
);
