import { sequelize, Foo } from '.';

describe('Getters&setters', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it('should get tablename', () => {
    const tableName = Foo.getTableName();
    expect(tableName).toBe('foos');
  });

  it('should get/set full name and presist to database', async () => {
    const user = await Foo.create({ firstname: 'Lin', lastname: 'Du' });
    expect(user.fullName).toBe('Lin Du');
    user.fullName = 'Bill Gates';
    await user.save();
    expect(user.firstname).toBe('Bill');
    expect(user.lastname).toBe('Gates');
    const presistedUser = await Foo.findOne({ where: { firstname: 'Bill' } });
    expect(presistedUser.firstname).toBe('Bill');
    expect(presistedUser.lastname).toBe('Gates');
  });
});
