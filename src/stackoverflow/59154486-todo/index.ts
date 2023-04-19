import { sequelize } from '../../examples/db';
import Sequelize, { Model, DataTypes } from 'sequelize';

class Group extends Model {}
Group.init(
  {
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { sequelize, modelName: 'Groups' },
);

class Employee extends Model {}
Employee.init(
  {
    employeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { sequelize, modelName: 'Employees' },
);

Group.belongsToMany(Employee, { through: 'GroupEmp', foreignKey: 'groupId' });
Employee.belongsToMany(Group, { through: 'GroupEmp', foreignKey: 'employeeId' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Group.bulkCreate([{ Employees: [{}, {}] }, { Employees: [{}, {}, {}] }], { include: [Employee] });
    // group and count
    const group = await Group.findAll({
      attributes: ['Groups.groupId', [Sequelize.fn('count', Sequelize.col('Employees.employeeId')), 'employeeCount']],
      include: [
        {
          model: Employee,
          attributes: [],
        },
      ],
      group: ['Groups.groupId'],
      order: [['groupId', 'ASC']],
    });
    console.log(group);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
