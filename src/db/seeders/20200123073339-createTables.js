'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      const bulkInsertLanguagesTask = queryInterface.bulkInsert('Language', [
        { ID: 1, Name: faker.random.locale(), Last_Update: Sequelize.fn('NOW') },
        { ID: 2, Name: faker.random.locale(), Last_Update: Sequelize.fn('NOW') },
      ]);
      const bulkInsertCategoriesTask = queryInterface.bulkInsert('Category', [
        { ID: 1, Name: faker.lorem.word(), Last_Update: Sequelize.fn('NOW') },
        { ID: 2, Name: faker.lorem.word(), Last_Update: Sequelize.fn('NOW') },
      ]);

      await Promise.all([bulkInsertLanguagesTask, bulkInsertCategoriesTask]);

      let [languages, categories] = await Promise.all([
        queryInterface.sequelize.query(`select * from "Language";`),
        queryInterface.sequelize.query(`select * from "Category";`),
      ]);
      languages = languages[0];
      categories = categories[0];

      await queryInterface.bulkInsert('Film', [
        {
          ID: 1,
          LanguageID: languages[0].ID,
          Title: faker.lorem.sentence(),
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
        },
        {
          ID: 2,
          LanguageID: languages[0].ID,
          Title: faker.lorem.sentence(),
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
        },
        {
          ID: 3,
          LanguageID: languages[1].ID,
          Title: faker.lorem.sentence(),
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
        },
      ]);

      let films = await queryInterface.sequelize.query(`select * from "Film";`);
      films = films[0];

      await queryInterface.bulkInsert('Film_Category', [
        { FilmID: films[0].ID, CategoryID: categories[0].ID, Last_Update: Sequelize.fn('NOW') },
        { FilmID: films[0].ID, CategoryID: categories[1].ID, Last_Update: Sequelize.fn('NOW') },
        { FilmID: films[1].ID, CategoryID: categories[1].ID, Last_Update: Sequelize.fn('NOW') },
      ]);
      await transaction.commit();
    } catch (error) {
      console.error(error);
      await transaction.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.bulkDelete('Film_Category', null);
      await queryInterface.bulkDelete('Film', null);
      await Promise.all(['Category', 'Language'].map((tableName) => queryInterface.bulkDelete(tableName)));
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
    }
  },
};
