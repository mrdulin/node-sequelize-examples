const service = require('./service');
const { sequelize } = require('./db');

it('test', async () => {
  const bulkInsertSpy = jest.spyOn(sequelize.getQueryInterface(), 'bulkInsert').mockImplementation();
  await service.create({ first: 'han', last: 'solo' });
  expect(bulkInsertSpy).toBeCalled();
  // expect(mockHook).toBeCalled();
});
