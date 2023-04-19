import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class Restaurant extends Model {}
Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'restaurant' },
);

class Menu extends Model {}
Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(500),
    image: DataTypes.TEXT,
  },
  { sequelize, modelName: 'menu001' },
);

Restaurant.hasMany(Menu, { foreignKey: 'restaurant_id', as: 'restaurant_menu' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant_menu' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
