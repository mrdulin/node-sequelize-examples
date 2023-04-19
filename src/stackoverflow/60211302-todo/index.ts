import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class A extends Model {}
A.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'a' },
);

class B extends Model {}
B.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'b' },
);

A.hasMany(B);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await A.create({ name: 'abc', bs: [{ name: 'x' }, { name: 'y' }, { name: 'z' }] }, { include: [B] });

    const data = await A.findAll({
      where: { name: 'abc' },
      include: [
        {
          model: B,
          // limit: 1,
        },
      ],
      raw: true,
      nest: true,
    });
    console.log(data);
    console.log(data[0].bs);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
