import { sequelize } from '../../db';
import { DataTypes, Model, Op } from 'sequelize';

class Foo extends Model {}
Foo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, tableName: 'foos' },
);

class Bar extends Model {}
Bar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    clients: DataTypes.ARRAY(DataTypes.STRING),
  },
  { sequelize, tableName: 'bars' },
);

Bar.belongsTo(Foo);
Foo.hasOne(Bar);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Foo.bulkCreate(
      [{ Bar: { clients: [] } }, { Bar: { clients: ['1', '2', '3'] } }, { Bar: { clients: ['1'] } }],
      { include: [{ model: Bar }] },
    );
    // test
    const foos = await Foo.findAll({
      include: [
        {
          model: Bar,
          where: {
            clients: {
              [Op.eq]: [],
            },
          },
        },
      ],
      raw: true,
    });
    console.log(foos);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
