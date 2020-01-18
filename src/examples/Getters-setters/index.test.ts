import { sequelize, Foo } from '.';

describe('Getters&setters', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it('should get full name', async () => {
    const user = await Foo.create({ firstname: 'Lin', lastname: 'Du' });
    expect(user.fullName).toBe('Lin Du');
  });
});
