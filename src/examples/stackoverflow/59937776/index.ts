import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: 'user' },
);

class Location extends Model {}
Location.init(
  {
    locationName: DataTypes.STRING,
  },
  { sequelize, modelName: 'location' },
);

class Item extends Model {}
Item.init(
  {
    itemName: DataTypes.STRING,
    orderDate: DataTypes.STRING,
  },
  { sequelize, modelName: 'item' },
);

User.hasMany(Item);
Location.hasMany(Item);
Item.belongsTo(User);
Item.belongsTo(Location);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    await User.create(
      {
        username: 'ddavids',
        email: 'hello@david.com',
        password: '12345678',
        items: [
          {
            itemName: 'Good Book',
            orderDate: '2020-01-20',
            location: { locationName: 'floor' },
          },
          {
            itemName: 'Bad Book',
            orderDate: '2020-01-21',
            location: { locationName: 'shelf' },
          },
        ],
      },
      {
        include: [{ model: Item, include: [Location] }],
      },
    );
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
