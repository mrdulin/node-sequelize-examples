import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class A extends Model {}
A.init(
  {
    bid: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
  },
  { sequelize, tableName: 'a' },
);

class B extends Model {}
B.init(
  {
    name: DataTypes.STRING(255),
  },
  { sequelize, tableName: 'b' },
);

A.belongsTo(B, { foreignKey: 'bid' });
B.hasMany(A, { foreignKey: 'bid' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await B.bulkCreate(
      [
        { name: 'x', As: [{ bid: 1, type: 1 }] },
        { name: 'y', As: [{ bid: 1, type: 2 }] },
        { name: 'z', As: [{ bid: 2, type: 3 }] },
        { name: 't', As: [{ bid: 3, type: 3 }] },
      ],
      { include: [A] },
    );
    // test
    const data = await A.findAll({
      include: [
        {
          model: B,
          where: {
            '$A.type$': 3,
          },
        },
      ],
      raw: true,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
