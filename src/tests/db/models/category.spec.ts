import { Category } from '../../../db/models';
import { sequelize } from '../../../db/db';

describe('models', () => {
  afterAll(async () => {
    await sequelize.close();
  });
  describe('Category', () => {
    it('should get catetories', async () => {
      const categories: Category[] = await Category.findAll();
      expect.assertions(categories.length);
      categories.forEach((category) => {
        expect(category).toEqual(
          expect.objectContaining({
            ID: expect.any(Number),
            Name: expect.any(String),
            Last_Update: expect.any(Date),
          }),
        );
      });
    });
  });
});
