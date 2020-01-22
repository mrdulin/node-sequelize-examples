import { Model, BelongsToManyAddAssociationMixin, DataTypes } from 'sequelize';
import { sequelize } from '../../db';

class Orders extends Model {
  public id!: number;
  public addItem!: BelongsToManyAddAssociationMixin<Items, number>;
}
Orders.init({}, { sequelize, modelName: 'order' });

class Items extends Model {
  public code!: number;
  public name!: string;
}
Items.init(
  {
    code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'item' },
);

class OrderItem extends Model {
  public orderId!: number;
  public itemCode!: number;
}
OrderItem.init({}, { sequelize, modelName: 'orderItem' });

Orders.belongsToMany(Items, { through: OrderItem });
Items.belongsToMany(Orders, { through: OrderItem });

export { sequelize, Orders, Items, OrderItem };
