import { sequelize } from '../../examples/db';
import { Model, DataTypes, Sequelize } from 'sequelize';

// const sequelize = new Sequelize('sqlite::memory:');

class Company extends Model {}
Company.init(
  {
    companyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  { sequelize, tableName: 'companies' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Company.create({ name: 'google' });
    // test
    const companyId = 1;
    const companyNewDetail = { name: 'reddit' };
    const result = await Company.update(companyNewDetail, {
      where: {
        companyId,
      },
      returning: true,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
