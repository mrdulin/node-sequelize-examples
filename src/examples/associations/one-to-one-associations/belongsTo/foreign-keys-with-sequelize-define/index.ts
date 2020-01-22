import { Model, BelongsToGetAssociationMixin, BuildOptions, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../../../../db';

export interface ITask extends Model {
  id: number;
  userId: number;
  title: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  getUser: BelongsToGetAssociationMixin<UserModelStatic>;
}

export type TaskModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ITask;
};

export interface IUser extends Model {
  id: number;
  username: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  getTasks: HasManyGetAssociationsMixin<TaskModelStatic>;
}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IUser;
};

const Task = <TaskModelStatic>sequelize.define('task', {
  title: DataTypes.STRING,
});

const User = <UserModelStatic>sequelize.define('user', {
  username: DataTypes.STRING,
});

User.hasMany(Task);
Task.belongsTo(User);

export { sequelize, Task, User };
