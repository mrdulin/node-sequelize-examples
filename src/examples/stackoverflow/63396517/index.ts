import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class Employee extends Model {}
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'employees' },
);

class Dependent extends Model {}
Dependent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // EmployeeId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: Employee,
    //     key: 'id',
    //   },
    // },
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'dependents' },
);

Employee.hasMany(Dependent);
Dependent.belongsTo(Employee);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Employee.bulkCreate(
      [
        { name: 'teresa', Dependents: [{ name: 'a' }, { name: 'b' }] },
        { name: 'teng', Dependents: [{ name: 'c' }, { name: 'd' }] },
      ],
      { include: [Dependent] },
    );
    const employee = await Employee.findOne({ where: { id: 1 }, include: [{ model: Dependent }] });
    console.log(employee);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
