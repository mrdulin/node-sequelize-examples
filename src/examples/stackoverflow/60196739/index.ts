import { sequelize as db } from '../../db';
import sequelize, { Model, BuildOptions } from 'sequelize';

interface ShopModel extends Model {}
type ShopModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ShopModel;
};

interface RateSectionModel extends Model {}
type RateSectionModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RateSectionModel;
};

export const Shop = <ShopModelStatic>db.define(
  'shop',
  {
    shopUrl: {
      type: sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
  },
);

export const RateSection = <RateSectionModelStatic>db.define(
  'rate_section',
  {
    minWeight: {
      type: sequelize.FLOAT,
      allowNull: false,
    },
    maxWeight: {
      type: sequelize.FLOAT,
      allowNull: false,
    },
    price: {
      type: sequelize.FLOAT,
      allowNull: false,
    },
    freeShippingMinPrice: {
      type: sequelize.FLOAT,
    },
    minShippingDays: {
      type: sequelize.INTEGER,
    },
    maxShippingDays: {
      type: sequelize.INTEGER,
    },
  },
  {
    underscored: true,
  },
);

Shop.hasMany(RateSection);
RateSection.belongsTo(Shop);

(async function test() {
  try {
    await db.sync({ force: true });
    const rateSection = {
      minWeight: 1,
      maxWeight: 2,
      price: 100,
      shop: {
        id: 1,
        shopUrl: 'https://stackoverflow.com/',
        active: true,
      },
    };
    await RateSection.create(rateSection, { include: [Shop] });
  } catch (error) {
    console.log(error);
  } finally {
    await db.close();
  }
})();
