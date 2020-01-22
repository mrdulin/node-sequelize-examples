import { Model, DataTypes, HasOneGetAssociationMixin, HasOneSetAssociationMixin } from 'sequelize';
import { sequelize } from '../../../db';

class User extends Model {
  public id!: number;
  public name!: string;
  public projectId!: number;
}
User.init({ name: DataTypes.STRING }, { sequelize, modelName: 'user' });

class Project extends Model {
  public id!: number;
  public getUser!: HasOneGetAssociationMixin<User>;
  public setUser!: HasOneSetAssociationMixin<User, number>;
}
Project.init({ name: DataTypes.STRING }, { sequelize, modelName: 'project' });

Project.hasOne(User);

export { sequelize, User, Project };
