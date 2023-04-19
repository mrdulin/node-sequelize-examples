import { sequelize } from '../../examples/db';
import { DataTypes, Model, BelongsToManyAddAssociationMixin } from 'sequelize';

class Part extends Model {}
Part.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  { sequelize },
);

class Order extends Model {
  public addPart!: BelongsToManyAddAssociationMixin<Order, number>;
}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  { sequelize },
);

class Order_Part extends Model {}
Order_Part.init({}, { sequelize });

Order.belongsToMany(Part, { through: Order_Part });
Part.belongsToMany(Order, { through: Order_Part });

(async function createOrder() {
  try {
    await sequelize.sync({ force: true });
    // test
    const order = await Order.create({ name: 'testName' });
    const part = await Part.create({ name: 'test' });
    await order.addPart(part);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
