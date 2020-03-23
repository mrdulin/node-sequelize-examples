import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class Company extends Model {}
Company.init({}, { sequelize, modelName: 'companies' });

class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'users' },
);

Company.hasMany(User, { as: 'Users' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Company.create(
      { Users: [{ name: 'tim' }, { name: 'elsa' }, { name: 'james' }] },
      { include: [{ model: User, as: 'Users' }] },
    );
    // test
    const company = await Company.findOne({
      where: { id: 1 },
      include: [
        {
          model: User,
          as: 'Users',
          separate: true,
          order: [['name', 'asc']],
        },
      ],
    });
    console.log(company.Users);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
