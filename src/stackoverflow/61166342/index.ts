import { sequelize as sequelizeInstance } from '../../examples/db';
import Note from './note';
import Category from './category';

Category.hasMany(Note, {
  sourceKey: 'id',
  foreignKey: 'categoryId',
  as: 'notes',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Note.belongsTo(Category, { foreignKey: 'categoryId', targetKey: 'id' });

(async function test() {
  try {
    await sequelizeInstance.sync({ force: true });
    // seed
    await Category.bulkCreate(
      [
        {
          title: 'tech',
          color: 1,
          notes: [
            { title: 'go', content: 'golang' },
            { title: 'nodejs', content: 'nodejs is good' },
          ],
        },
        {
          title: 'food',
          color: 2,
          notes: [{ title: 'beef', content: 'I like beef' }],
        },
      ],
      { include: [{ model: Note, as: 'notes' }] },
    );

    // test
    const result = await Note.findAll({ include: [Category], raw: true });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelizeInstance.close();
  }
})();
