import { sequelize } from '../../db';
import { Model, DataTypes, HasManyAddAssociationsMixin } from 'sequelize';

class User extends Model {
  public addProducts!: HasManyAddAssociationsMixin<Product, number>;
}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize, modelName: 'users' },
);

class Product extends Model {}
Product.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: 'products' },
);

User.hasMany(Product);
Product.belongsTo(User);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await User.create(
      {
        email: 'example@gmail.com',
        products: [{ name: 'apple' }, { name: 'amd' }],
      },
      { include: [Product] },
    );
    // add another two products for this user
    const SomeID = 1;
    const productobj = [{ name: 'nvidia' }, { name: 'intel' }];
    const productModels = await Product.bulkCreate(productobj);
    const userObj = await User.findOne({ where: { id: SomeID } });
    await userObj.addProducts(productModels);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
