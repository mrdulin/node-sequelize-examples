import { Model, DataTypes, BelongsToManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../../db';

class Project extends Model {
  public id!: number;
  public name!: string;
  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
}
Project.init({ name: DataTypes.STRING }, { sequelize, modelName: 'project' });

class User extends Model {
  public id!: number;
  public name!: string;
  public getProjects!: BelongsToManyGetAssociationsMixin<Project>;
}
User.init({ name: DataTypes.STRING }, { sequelize, modelName: 'user' });

Project.belongsToMany(User, { through: 'UserProject', timestamps: false });
User.belongsToMany(Project, { through: 'UserProject', timestamps: false });

export { sequelize, Project, User };
