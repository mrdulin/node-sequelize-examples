'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      const studentsData = [
        {
          _id: faker.random.uuid(),
          name: faker.name.findName(),
          email: faker.internet.email(),
          dateOfBirth: Sequelize.fn('NOW'),
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
      ];
      await queryInterface.bulkInsert('Students', studentsData);
      const rval = await queryInterface.sequelize.query(`select * from "Students";`);
      const students = rval[0];
      const projectData = [
        {
          project_id: faker.random.uuid(),
          name: faker.lorem.word(),
          student_id: students[0]._id,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
        },
      ];
      await queryInterface.bulkInsert('Projects', projectData);
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.bulkDelete('Students', null);
      await queryInterface.bulkDelete('Projects', null);
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  },
};
