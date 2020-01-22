import Sequelize, { Model, BelongsToGetAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../../db';

class Product extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public getUser!: BelongsToGetAssociationMixin<User>;
}
Product.init({ title: Sequelize.STRING }, { sequelize, modelName: 'product' });

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public getAddresses!: HasManyGetAssociationsMixin<Address>;
  public addresses?: Address[];
}
User.init({ firstName: Sequelize.STRING, lastName: Sequelize.STRING }, { sequelize, modelName: 'user' });

class Address extends Model {
  public id!: number;
  public type!: string;
  public line1!: string;
  public line2!: string;
  public city!: string;
  public state!: string;
  public zip!: string;
}
Address.init(
  {
    type: Sequelize.STRING,
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
  },
  { sequelize, modelName: 'address' },
);

// Product.User = Product.belongsTo(User);
// User.Addresses = User.hasMany(Address);

const ProductBelongsToUser = Product.belongsTo(User);
const UserHasManyAddress = User.hasMany(Address);

export { sequelize, Product, User, Address, ProductBelongsToUser, UserHasManyAddress };
