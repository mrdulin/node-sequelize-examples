import { Category, Film } from '../../../db/models';
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

    it('should get films by category', async () => {
      const category: Category = await Category.findByPk(1);
      const films: Film[] = await category.getFilms();
      console.log(films);
    });

    it.only('should get categories by Film', async () => {
      const film: Film = await Film.findByPk(1);
      const categories: Category[] = await film.getCategories();
      console.log(categories);
    });
  });
});
