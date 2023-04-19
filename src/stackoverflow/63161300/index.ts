import { sequelize } from '../../examples/db';
import { DataTypes, Model } from 'sequelize';
class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    img_url: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, timestamps: false, tableName: 'product' },
);

class Category extends Model {}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, timestamps: false, tableName: 'category' },
);

Product.belongsTo(Category, { as: 'categorias', foreignKey: 'category_id' });
Category.hasMany(Product, { as: 'productos', foreignKey: 'category_id' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
