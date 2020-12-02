import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class Service extends Model {}
Service.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
  },
  { sequelize },
);

class Tag extends Model {}
Tag.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  { sequelize },
);

Service.belongsToMany(Tag, { through: 'Service_Tag', as: 'tags' });
Tag.belongsToMany(Service, { through: 'Service_Tag', as: 'services' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    //seed
    await Service.bulkCreate(
      [
        { name: 'Restaurant X', slug: 'a', tags: [{ name: 'restaurant' }, { name: 'b' }] },
        { name: 'Restaurant Y', slug: 'b', tags: [{ name: 'c' }] },
        { name: 'Restaurant Z', slug: 'c', tags: [{ name: 'restaurant' }] },
      ],
      { include: [{ model: Tag, as: 'tags' }] },
    );
  } catch (error) {
    console.log(error);
  }
})();

export { Service, Tag };
