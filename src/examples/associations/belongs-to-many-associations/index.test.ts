import { sequelize, Project, User } from './';
import faker from 'faker';

describe('associations', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  describe('belongs to many associations', () => {
    it('should create project and user data rows and UserProject table', async () => {
      const usersOfProject1 = [{ name: faker.name.findName() }, { name: faker.name.findName() }];
      const usersOfProject2 = [
        { name: faker.name.findName() },
        { name: faker.name.findName() },
        { name: faker.name.findName() },
      ];
      const projects: Project[] = await Project.bulkCreate(
        [
          { name: faker.commerce.productName(), users: usersOfProject1 },
          { name: faker.commerce.productName(), users: usersOfProject2 },
        ],
        { include: [User] },
      );
      const project1 = projects[0];
      const userModelsOfProject1: User[] = await project1.getUsers();
      const userNamesOfProject1: Array<{ name: string }> = userModelsOfProject1.map((m: User) => ({ name: m.name }));
      expect(userNamesOfProject1).toEqual(usersOfProject1);
    });
  });
});
