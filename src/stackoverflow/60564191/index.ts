import { sequelize } from '../../examples/db';
import Sequelize, { Model, DataTypes, Op } from 'sequelize';

class Category extends Model {}
Category.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'categories' },
);

Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent', targetKey: 'id' });

(async function test() {
  try {
    await sequelize.sync({ force: true });

    // seed
    const parent1 = { id: 1, name: 'Mobile' };
    const parent2 = { id: 4, name: 'Kitchenware' };
    await Category.bulkCreate([parent1, parent2]);
    await Category.bulkCreate([
      { id: 7, name: 'Mobile Cover', parentId: parent1.id },
      { id: 8, name: 'Knife', parentId: parent2.id },
      { id: 9, name: 'Mobile Glass', parentId: parent1.id },
    ]);

    // test
    const result = await Category.findAll({
      include: [
        {
          model: Category,
          required: true,
          as: 'parent',
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'name'],
      raw: true,
    });
    console.log('result: ', result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
