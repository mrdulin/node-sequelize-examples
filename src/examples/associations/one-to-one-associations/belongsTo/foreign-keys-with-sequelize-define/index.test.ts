import { sequelize, Task, User, ITask, IUser } from './';
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
      const taskModel: ITask = await Task.create<ITask>(
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
      const userModel: IUser = await User.create<IUser>(
        {
          username: faker.name.findName(),
          tasks,
        },
        { include: [Task] },
      );
      // 必须要定义associations: User.hasMany(Task);
      // 否则，userModel.getTasks() 方法不存在
      const taskModels: ITask[] = await userModel.getTasks();
      expect(taskModels).toHaveLength(tasks.length);
    });
  });
});
