import { sequelize } from '../../db';
import Sequelize, { Op } from 'sequelize';
import assert from 'assert';

class Car extends Sequelize.Model {}
Car.init(
  {
    favorites: {
      type: Sequelize.JSONB,
    },
  },
  { sequelize, modelName: 'Car' },
);

class Sedan extends Sequelize.Model {}
Sedan.init({}, { sequelize, modelName: 'Sedan' });

Car.hasMany(Sedan);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await Car.create({ favorites: [1, 5, 6], Sedans: [{ id: 1 }, { id: 2 }] }, { include: [Sedan] });

    const cars = await Car.findAll({
      attributes: ['id'],
      include: [
        {
          model: Sedan,
          where: {
            id: {
              [Op.in]: [Sequelize.literal(`select jsonb_array_elements_text(favorites)::integer from "Car"`)],
            },
          },
        },
      ],
    });
    assert(cars[0].Sedans.length === 1, 'The count of sedans is not correct');
    console.log(cars[0].Sedans);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
