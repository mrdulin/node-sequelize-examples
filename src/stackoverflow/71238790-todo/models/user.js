const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');

class User extends Model {}

User.init(
  { first: DataTypes.STRING, last: DataTypes.STRING },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      afterSave: async (user) => {
        console.log('afterSave');
      },
    },
  },
);

module.exports = User;
