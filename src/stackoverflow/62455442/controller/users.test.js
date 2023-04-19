const users = require('./users');

jest.mock('../models/users', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  const UserMock = dbMock.define('user');
  UserMock.$queryInterface.$useHandler((query, queryOptions) => {
    if (query === 'findAndCountAll') {
      return { count: 2, rows: [UserMock.build({ id: 1 }), UserMock.build({ id: 2 })] };
    } else if (query === 'findOne') {
      return UserMock.build({ id: queryOptions[0].where.id });
    }
  });
  return UserMock;
});

describe('Testing use.list()', () => {
  it('UsersController.list() should return a status code 201 and all Users data in object array', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await users.list(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          count: 2,
          rows: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
            }),
          ]),
        }),
      }),
    );
  });
  it('UsersController.view() should return a status code 201 and user data obj', async () => {
    const req = { params: { id: 2 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await users.view(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          id: 2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      }),
    );
  });
});
