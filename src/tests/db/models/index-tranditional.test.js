const db = require('../../../db/models/index-tranditional');

describe('transition model organization', () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  it('should get user', async () => {
    const user = await db.User.findByPk(1);
    console.log(user);
  });

  describe('#59773936', () => {
    beforeAll(async () => {
      await db.sequelize.sync({ force: true });
    });
    it('should get students and projects', async () => {
      const student = await db.Student.findOne();
      console.log(student);
      const projects = await student.getProjects();
      console.log(projects);
    });

    it.only('should delete all projects belong to user if user is deleted', async () => {
      const faker = require('faker');
      const projectData = [
        {
          // project_id: faker.random.uuid(),
          name: faker.lorem.word(),
          createdAt: db.Sequelize.fn('NOW'),
          updatedAt: db.Sequelize.fn('NOW'),
        },
      ];
      const studentsData = [
        {
          // _id: faker.random.uuid(),
          name: faker.name.findName(),
          email: faker.internet.email(),
          dateOfBirth: db.Sequelize.fn('NOW'),
          createdAt: db.Sequelize.fn('NOW'),
          updatedAt: db.Sequelize.fn('NOW'),
          projects: projectData,
        },
      ];
      await db.Student.bulkCreate(studentsData, { include: [{ model: db.Project, as: 'projects' }] });

      // const student = await db.Student.findOne();
      // await student.destroy();
      // const projectsCount = await db.Project.count();
      // console.log(projectsCount);
      // expect(projectsCount).toBe(0);
    });
  });
});
