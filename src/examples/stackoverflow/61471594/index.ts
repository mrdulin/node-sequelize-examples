import { sequelize } from '../../db';
import { Model, DataTypes, Op } from 'sequelize';

class Employee extends Model {}
Employee.init(
  {
    EmployeeID: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
  },
  { sequelize, modelName: 'employee' },
);

class Hobby extends Model {}
Hobby.init(
  {
    ID: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    EmployeeID: DataTypes.INTEGER,
    Name: DataTypes.STRING,
  },
  { sequelize, modelName: 'hobby' },
);

Employee.hasMany(Hobby, { as: 'Hobbies', foreignKey: 'EmployeeID', sourceKey: 'EmployeeID' });
Hobby.belongsTo(Employee, { foreignKey: 'EmployeeID', targetKey: 'EmployeeID' });

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // seed
    await Employee.create(
      {
        FirstName: 'John',
        LastName: 'Doe',
        Hobbies: [{ Name: 'Sports - Basketball' }, { Name: 'Sports - Volleyball' }],
      },
      { include: [{ model: Hobby, as: 'Hobbies' }] },
    );
    // test
    const result = await Employee.findAndCountAll({
      attributes: ['FirstName', 'LastName'],
      include: [
        {
          model: Hobby,
          as: 'Hobbies',
          attributes: ['ID', 'Name'],
          where: {
            [Op.or]: [{ ID: 1 }, { ID: 2 }],
          },
        },
      ],
    });
    console.log('result:', result);
    console.log('hobbies:', result.rows[0].Hobbies);
  } catch (error) {
    console.log(error);
  } finally {
    sequelize.close();
  }
})();
