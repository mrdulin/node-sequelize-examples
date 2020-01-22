import { DataTypes } from 'sequelize';
import { sequelize } from '../../db';

export const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const Type = sequelize.define('type', {
  typeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.Type = User.belongsTo(Type, { foreignKey: { allowNull: false } });

export const createUser = (req, res) => {
  const { name, type } = req.body;
  return User.create(
    {
      name,
      type: { typeName: type },
    },
    { include: [{ association: User.Type }] },
  )
    .then(() => console.log('success'))
    .catch((err) => console.log(err));
};
