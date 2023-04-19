import { sequelize } from '../../examples/db';
import { Model, DataTypes, Op, WhereValue } from 'sequelize';

class SubCategory extends Model {}
SubCategory.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'SubCategory', tableName: 'subcategories' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await SubCategory.bulkCreate([{}, {}, {}]);
    // test
    const whereValue: WhereValue[] = [];
    const subcategories = [{ category_id: 2 }, { category_id: 1 }];
    subcategories.forEach((item) => {
      whereValue.push({ category_id: item.category_id });
    });
    const result = await SubCategory.findAll({
      where: {
        [Op.or]: whereValue,
      },
      raw: true,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
