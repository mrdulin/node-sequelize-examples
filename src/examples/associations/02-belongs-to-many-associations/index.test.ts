import { Film, Category, Language, sequelize } from './';
import { Sequelize } from 'sequelize';
import faker from 'faker';

describe('models', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it('should create data records and associations for each model correctly', async () => {
    const c1 = { Name: faker.lorem.word(), Last_Update: Sequelize.fn('NOW') };
    const c2 = { Name: faker.lorem.word(), Last_Update: Sequelize.fn('NOW') };
    const lang1 = { ID: 1, Name: faker.random.locale(), Last_Update: Sequelize.fn('NOW') };
    const lang2 = { ID: 2, Name: faker.random.locale(), Last_Update: Sequelize.fn('NOW') };
    const langs = await Language.bulkCreate([lang1, lang2]);
    const filmRecords = [
      {
        Title: faker.lorem.sentence(),
        LanguageID: langs[0].ID,
        Description: faker.lorem.sentence(),
        Release_Year: faker.random.number({ min: 1900, max: 2030 }),
        Rental_Duration: faker.random.number({ min: 0, max: 1000 }),
        Rental_Date: faker.random.number({ min: 0, precision: 0.01 }),
        Length: faker.random.number({ min: 0, max: 100 }),
        Replacement_Cost: faker.random.number({ min: 0, precision: 0.01 }),
        Rating: faker.random.number({ min: 1, max: 10 }),
        Last_Update: Sequelize.fn('NOW'),
        Special_Features: faker.lorem.word(),
        Fulltext: faker.lorem.sentence(),
        Categories: [c1, c2],
      },
      {
        Title: faker.lorem.sentence(),
        LanguageID: langs[0].ID,
        Description: faker.lorem.sentence(),
        Release_Year: faker.random.number({ min: 1900, max: 2030 }),
        Rental_Duration: faker.random.number({ min: 0, max: 1000 }),
        Rental_Date: faker.random.number({ min: 0, precision: 0.01 }),
        Length: faker.random.number({ min: 0, max: 100 }),
        Replacement_Cost: faker.random.number({ min: 0, precision: 0.01 }),
        Rating: faker.random.number({ min: 1, max: 10 }),
        Last_Update: Sequelize.fn('NOW'),
        Special_Features: faker.lorem.word(),
        Fulltext: faker.lorem.sentence(),
        Categories: [c1],
      },
      {
        Title: faker.lorem.sentence(),
        LanguageID: langs[1].ID,
        Description: faker.lorem.sentence(),
        Release_Year: faker.random.number({ min: 1900, max: 2030 }),
        Rental_Duration: faker.random.number({ min: 0, max: 1000 }),
        Rental_Date: faker.random.number({ min: 0, precision: 0.01 }),
        Length: faker.random.number({ min: 0, max: 100 }),
        Replacement_Cost: faker.random.number({ min: 0, precision: 0.01 }),
        Rating: faker.random.number({ min: 1, max: 10 }),
        Last_Update: Sequelize.fn('NOW'),
        Special_Features: faker.lorem.word(),
        Fulltext: faker.lorem.sentence(),
        Categories: [c2],
      },
    ];
    await Film.bulkCreate(filmRecords, { include: [Category] });

    const film: Film = await Film.findByPk(1);
    const categories: Category[] = await film.getCategories();
    expect(categories).toHaveLength(2);
    const lang1Model: Language = langs[0];
    const films: Film[] = await lang1Model.getFilms();
    expect(films).toHaveLength(2);
  });
});
