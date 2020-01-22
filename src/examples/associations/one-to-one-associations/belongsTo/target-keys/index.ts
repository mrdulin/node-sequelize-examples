import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../../../../db';

class User extends Model {
  public id!: number;
  public fk_companyname!: string;
  public username!: string;

  public getCompany!: BelongsToGetAssociationMixin<Company>;
}
User.init({ username: DataTypes.STRING }, { sequelize, modelName: 'user' });

class Company extends Model {
  public id!: number;
  public name!: string;
}
Company.init(
  {
    // 要指定target key作为source table的foreign key, 该target key必须拥有unique constraint，否则，报错如下
    // SequelizeDatabaseError: there is no unique constraint matching given keys for referenced table
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'company' },
);

User.belongsTo<User, Company>(Company, { targetKey: 'name', foreignKey: 'fk_companyname' });

export { sequelize, User, Company };
