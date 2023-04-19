const controller = require('./controller');

jest.mock('./models/details', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const UserMock = dbMock.define('users');
  UserMock.$queryInterface.$useHandler((query, queryOptions) => {
    if (query === 'findAll') {
      if (queryOptions[0].where.user_id === 147) {
        return null;
      }
    }
  });
  return UserMock;
});

describe('69230853', () => {
  test('should return 404 and an empty array', async () => {
    const userId = 147;
    const details = await controller.getDetailsByUserId(userId);
    expect(details.status).toEqual(404);
  });
});
