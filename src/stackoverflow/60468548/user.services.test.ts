import { UserService } from './user.services';

describe('60468548', () => {
  it('should update user that input by', async () => {
    const dataInput = { id: 1, username: 'teguh', userPassword: 'apake' };
    const userModelInstanceMock = { save: jest.fn() };
    const userModelMock = { findByPk: jest.fn().mockResolvedValueOnce(userModelInstanceMock) };
    const userService = new UserService(userModelMock);
    const actual = await userService.updateUser(dataInput);
    expect(userModelMock.findByPk).toBeCalledWith(1);
    expect(userModelInstanceMock.save).toBeCalledTimes(1);
  });
});
