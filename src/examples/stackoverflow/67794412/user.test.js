import User from './models/user'; // original user model class

jest.mock('./models/user', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('User', { id: 111, username: 'myusername' });
});

test('blabla', async () => {
  const r = await User.findOne({ where: { id: 1 } });
  expect(r).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      username: 'myusername',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    }),
  );
});
