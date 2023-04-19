import { createUser, Type, User } from '.';
import { sequelize } from '../../examples/db';

describe('59849396', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it('should create user with type correctly', async () => {
    const mReq = { body: { name: 'Tom', type: 'band' } };
    const mRes = {};
    await createUser(mReq, mRes);
    const type = await Type.findOne({ where: { typeName: 'band' } });
    const user = await User.findOne({ where: { name: 'Tom' } });
    expect(type.typeName).toBe(mReq.body.type);
    expect(user.typeId).toBe(type.id);
  });
});
