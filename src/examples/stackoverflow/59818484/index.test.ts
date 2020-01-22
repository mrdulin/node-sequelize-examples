import { sequelize, Orders, Items } from './';

describe('59818484', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it('should pass', (done) => {
    expect.assertions(3);
    const orderDetails = {
      items: [
        { code: 1, name: 'a' },
        { code: 2, name: 'b' },
      ],
    };
    let count = 0;
    Orders.create(orderDetails).then(async (order: Orders) => {
      const items = await Items.findAll();
      expect(items).toHaveLength(0);
      orderDetails.items.forEach((item) => {
        Items.findByPk(item.code)
          .then((item: Items) => {
            expect(typeof order.addItem).toBe('function');
            return order.addItem(item);
          })
          .finally(() => {
            count++;
            if (count === orderDetails.items.length) {
              done();
            }
          });
      });
    });
  });
});
