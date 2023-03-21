const Sequelize = require('sequelize');

module.exports = Sequelize.define(
  'User',
  {
    user_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'users',
  },
);
