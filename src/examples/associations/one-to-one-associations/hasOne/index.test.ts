import { sequelize, User, Project } from './';
import faker from 'faker';

describe('associations', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it('should create table with correct table names', () => {
    expect(User.getTableName()).toBe('users');
    expect(Project.getTableName()).toBe('projects');
  });
  describe('one-to-one-associations', () => {
    describe('hasOne', () => {
      it('should create project data row and get user data row', async () => {
        const user = { name: faker.name.findName() };
        const projectModel: Project = Project.build({ name: faker.commerce.productName(), user }, { include: [User] });
        await projectModel.save();
        const userModel: User = await projectModel.getUser();
        expect(userModel.name).toBe(user.name);
      });
    });
  });
});
