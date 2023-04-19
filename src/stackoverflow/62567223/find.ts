import { User, Tool } from './main';
import { sequelize } from '../../examples/db';

(async function() {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(
      [
        {
          id: 1,
          name: 'a',
          tools: [
            { id: 1, name: 't-a' },
            { id: 2, name: 't-b' },
          ],
        },
        {
          id: 2,
          name: 'b',
          tools: [
            { id: 3, name: 't-c' },
            { id: 4, name: 't-d' },
            { id: 5, name: 't-e' },
          ],
        },
      ],
      { include: [Tool] },
    );

    const result = await User.findAll({
      where: { id: '1' },
      include: [{ model: Tool }],
    });
    console.log('result:', result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
