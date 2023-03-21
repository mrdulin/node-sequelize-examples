const { getAllUsers } = require('./User');

jest.mock('../models/user', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  return dbMock.define('User', {
    user_id: '2',
    login: 'steve',
    password: 'good',
    age: 34,
    isDeleted: false,
  });
});

describe('User database', () => {
  it('getAllUsers should return users', async () => {
    const users = await getAllUsers();
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: '2',
          login: 'steve',
          password: 'good',
          age: 34,
          isDeleted: false,
        }),
      ]),
    );
  });
});
