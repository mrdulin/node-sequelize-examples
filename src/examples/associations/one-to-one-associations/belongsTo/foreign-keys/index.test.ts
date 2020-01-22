import { sequelize, Task, User } from '../foreign-keys';
import faker from 'faker';

describe('associations', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  describe('foreign keys', () => {
    it('should create task and user data row, task has "useId" foreign key', async () => {
      const user = { username: faker.name.findName() };
      const taskModel: Task = await Task.create<Task>(
        {
          title: faker.lorem.sentence(),
          user,
        },
        { include: [User] },
      );
      const userModel = await taskModel.getUser();
      expect(userModel.username).toEqual(user.username);
    });

    it('should create user and task data rows, task has "userId" foreign key', async () => {
      const tasks = [
        { title: faker.lorem.sentence() },
        { title: faker.lorem.sentence() },
        { title: faker.lorem.sentence() },
      ];
      const userModel: User = await User.create<User>(
        {
          username: faker.name.findName(),
          tasks,
        },
        { include: [Task] },
      );
      // 必须要定义associations: User.hasMany(Task);
      // 否则，userModel.getTasks() 方法不存在
      const taskModels: Task[] = await userModel.getTasks();
      expect(taskModels).toHaveLength(tasks.length);
    });
  });
});
