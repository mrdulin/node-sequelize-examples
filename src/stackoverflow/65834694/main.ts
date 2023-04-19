import { sequelize } from '../../examples/db';
import { Model, DataTypes, HasManyGetAssociationsMixin, HasManySetAssociationsMixin } from 'sequelize';

class User extends Model {
  public id!: number;

  public getPreferences!: HasManyGetAssociationsMixin<Preference>;
  public setPreferences!: HasManySetAssociationsMixin<Preference, Preference['id']>;
  public readonly Preferences?: Preference[];

  public _inMemoryAssociatedPreferences: Preference[] = [];
}
User.init({}, { sequelize });

class Preference extends Model {
  public id!: number;
  public name!: string;
}
Preference.init({ name: DataTypes.STRING }, { sequelize });

User.hasMany(Preference);
Preference.belongsTo(User);

(async function test() {
  await sequelize.sync({ force: true });
  await User.create({ id: 1 });
  const user: User = await User.findOne({ where: { id: 1 } });
  const pref = await Preference.create({ id: 1, name: 'a' });
  await user.setPreferences(pref);
  user._inMemoryAssociatedPreferences = [pref];

  // elsewhere
  console.log('in memory preferences:', user._inMemoryAssociatedPreferences);
  await sequelize.close();
})();

// (async function test() {
//   // https://sequelize.org/master/manual/typescript.html
//   console.log(User.associations.preferences);
//   await sequelize.sync({ force: true });

//   await User.create({ id: 1 });

//   const user: User = await User.findOne({ where: { id: 1 } });
//   console.log(user.Preferences);

//   const pref = await Preference.create({ id: 1, name: 'a' });
//   await user.setPreferences(pref);
//   console.log(user.Preferences);

//   const user2: User = await User.findOne({ where: { id: 1 }, include: [Preference] });
//   console.log(user2.Preferences); // it's only populated when explicitly requested in code

//   await sequelize.close();
// })();
