import { sequelize, User, Company } from './';
import faker from 'faker';

describe('associations', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it('should create table with plural names', () => {
    expect(User.getTableName()).toBe('users');
    expect(Company.getTableName()).toBe('companies');
  });

  describe('target keys', () => {
    it('should add foreign key overwritten by foreignKey option with specific target key', async () => {
      const company = {
        name: faker.company.companyName(),
      };
      const userModel: User = await User.create(
        {
          username: faker.name.findName(),
          company,
        },
        { include: [Company] },
      );
      expect(userModel.fk_companyname).toBe(company.name);
    });
  });
});
