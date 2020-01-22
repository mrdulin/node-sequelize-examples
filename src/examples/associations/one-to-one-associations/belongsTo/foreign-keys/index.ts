import Sequelize, { Model, HasManyGetAssociationsMixin, BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../../../../db';

class Task extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public getUser!: BelongsToGetAssociationMixin<User>;
}
Task.init({ title: Sequelize.STRING }, { sequelize, modelName: 'task' });
class User extends Model {
  public id!: number;
  public username!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTasks!: HasManyGetAssociationsMixin<Task>;
}
User.init({ username: Sequelize.STRING }, { sequelize, modelName: 'user' });

User.hasMany(Task);
Task.belongsTo(User);

export { sequelize, Task, User };
