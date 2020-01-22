import { sequelize, Product, User, Address, ProductBelongsToUser, UserHasManyAddress } from './';

describe('associations', () => {
  const addresses = [{ type: 'home', line1: '100 Main St.', city: 'Austin', state: 'TX', zip: '78704' }];
  const user = { firstName: 'Mick', lastName: 'Broadstone', addresses };
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  describe('cerate with associations', () => {
    it('should create product, user and address with IncludeOptions.model', async () => {
      const product: Product = await Product.create(
        { title: 'Chair', user },
        { include: [{ model: User, include: [Address] }] },
      );
      const userModel: User = await product.getUser();
      expect(userModel.firstName).toBe(user.firstName);
      expect(userModel.lastName).toBe(user.lastName);
      expect(userModel.addresses).toBeUndefined();
      const addressModels: Address[] = await userModel.getAddresses();
      expect(addressModels).toHaveLength(addresses.length);

      // query user with address data rows
      const userModelIncludeAddresses = await product.getUser({ include: [{ model: Address }] });
      expect(userModelIncludeAddresses.firstName).toBe(user.firstName);
      expect(userModelIncludeAddresses.lastName).toBe(user.lastName);
      expect(userModelIncludeAddresses.addresses).toHaveLength(addresses.length);
    });

    it.only('should create product, user and address with IncludeOptions.association', async () => {
      const product: Product = await Product.create(
        { title: 'Chair', user },
        { include: [{ association: ProductBelongsToUser, include: [{ association: UserHasManyAddress }] }] },
      );
      const userModel: User = await product.getUser();
      expect(userModel.firstName).toBe(user.firstName);
      expect(userModel.lastName).toBe(user.lastName);
      expect(userModel.addresses).toBeUndefined();
      const addressModels: Address[] = await userModel.getAddresses();
      expect(addressModels).toHaveLength(addresses.length);

      // query user with address data rows
      const userModelIncludeAddresses = await product.getUser({ include: [{ model: Address }] });
      expect(userModelIncludeAddresses.firstName).toBe(user.firstName);
      expect(userModelIncludeAddresses.lastName).toBe(user.lastName);
      expect(userModelIncludeAddresses.addresses).toHaveLength(addresses.length);
    });
  });
});
