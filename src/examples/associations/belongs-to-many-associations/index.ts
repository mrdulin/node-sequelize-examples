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
  public readonly users?: User[];

  public static associations: {
    users: Association<Project, User>;
  };
}
Project.init({ name: DataTypes.STRING }, { sequelize, modelName: 'project' });

class User extends Model {
  public id!: number;
  public name!: string;
  public getProjects!: BelongsToManyGetAssociationsMixin<Project>;
  public addProject!: BelongsToManyAddAssociationMixin<Project, number>;
}
User.init({ name: DataTypes.STRING }, { sequelize, modelName: 'user' });

Project.belongsToMany(User, { through: 'UserProject', timestamps: false });
User.belongsToMany(Project, { through: 'UserProject', timestamps: false });

export { sequelize, Project, User };
