import { sequelize } from '../../examples/db';
import { Model, DataTypes, HasManyGetAssociationsMixin, BelongsToGetAssociationMixin } from 'sequelize';
import assert from 'assert';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public getCompanies!: HasManyGetAssociationsMixin<Company>;
}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: 'User', underscored: true },
);

class Company extends Model {
  public id!: number;
  public name!: string;
  public owner_id!: number;
  public getOwner!: BelongsToGetAssociationMixin<User>;
}
Company.init({ name: DataTypes.STRING }, { sequelize, modelName: 'Company', underscored: true });

User.hasMany(Company, { foreignKey: 'owner_id' });
Company.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.create(
      { username: 'jenifer', password: '123', Companies: [{ name: 'Google' }, { name: 'Twitter' }] },
      { include: [Company] },
    );
    const user: User = await User.findByPk(1);
    assert(user.username === 'jenifer', 'The user should be jenifer');
    const companies: Company[] = await user.getCompanies();
    assert(companies.length === 2, 'The count of companies of jenifer should be 2');
    const company1 = companies[0];
    assert(typeof company1['User_id'] === 'undefined', 'User_id column should not be added to company model');
    const owner = await company1.getOwner();
    assert(owner.username === user.username);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
