import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  Association,
} from 'sequelize';
import { sequelize } from '../../db';

class Project extends Model {
  public id!: number;
  public name!: string;
  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public addUser!: BelongsToManyAddAssociationMixin<User, number>;
}
Project.init({ name: DataTypes.STRING }, { sequelize, modelName: 'project' });

class User extends Model {
  public id!: number;
  public name!: string;
  public getProjects!: BelongsToManyGetAssociationsMixin<Project>;
  public addProject!: BelongsToManyAddAssociationMixin<Project, number>;
}
User.init({ name: DataTypes.STRING }, { sequelize, modelName: 'user' });

class UserProject extends Model {
  public userId!: number;
  public projectId!: number;
}
UserProject.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'user_project' },
);

Project.belongsToMany(User, { through: UserProject });
User.belongsToMany(Project, { through: UserProject });

export { sequelize, Project, User };
