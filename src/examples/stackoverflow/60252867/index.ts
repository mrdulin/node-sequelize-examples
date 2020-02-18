import { sequelize } from '../../db';
import { Model, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';

class User extends Model {
  public getTeams!: HasManyGetAssociationsMixin<Team>;
}
User.init({}, { sequelize, modelName: 'user' });

class Team extends Model {}
Team.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'team' },
);

User.hasMany(Team);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const user = await User.create({ teams: [{ name: 'Bull' }, { name: 'Thunder' }] }, { include: [Team] });
    const teams = await user.getTeams();
    const teamDataValues = teams.map((team) => team.dataValues);
    console.log('teamDataValues: ', teamDataValues);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
