const db = require('../../../db/models/index-tranditional');

describe('transition model organization', () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  it('should get user', async () => {
    const user = await db.User.findByPk(1);
    console.log(user);
  });
});
