import { User, Server } from './models';
import { sequelize } from '../../db';
import faker from 'faker';

(async function test() {
  try {
    await sequelize.sync({ force: true });
    await (User as any).bulkCreate(
      [
        {
          id: 1,
          username: faker.name.findName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          servers: [
            { user_id: 1, name: faker.name.findName(), thumbnail: faker.random.image(), endpoint: faker.random.uuid() },
            { user_id: 1, name: faker.name.findName(), thumbnail: faker.random.image(), endpoint: faker.random.uuid() },
          ],
        },
        {
          id: 2,
          username: faker.name.findName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          servers: [
            { user_id: 2, name: faker.name.findName(), thumbnail: faker.random.image(), endpoint: faker.random.uuid() },
          ],
        },
      ],
      { include: [Server] },
    );
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
