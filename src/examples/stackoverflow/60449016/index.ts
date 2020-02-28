import { sequelize } from '../../db';
import { Model, DataTypes } from 'sequelize';

class Coupon extends Model {}
Coupon.init(
  {
    coupon_id: {
      unique: true,
      type: DataTypes.BIGINT,
    },
  },
  { sequelize, modelName: 'Coupons' },
);

class ItemType extends Model {}
ItemType.init(
  {
    item_type_id: {
      unique: true,
      type: DataTypes.SMALLINT,
    },
  },
  { sequelize, modelName: 'ItemTypes' },
);

class CouponItemType extends Model {}
CouponItemType.init(
  {
    coupon_id: DataTypes.BIGINT,
    item_type_id: DataTypes.SMALLINT,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_on: DataTypes.DATE,
    updated_on: DataTypes.DATE,
  },
  { sequelize, modelName: 'CouponItemType' },
);

Coupon.belongsToMany(ItemType, {
  through: 'CouponItemType',
  as: 'coupon_type',
  foreignKey: 'coupon_id',
  otherKey: 'item_type_id',
});

ItemType.belongsToMany(Coupon, {
  through: 'CouponItemType',
  as: 'coupon_item_types',
  foreignKey: 'item_type_id',
  otherKey: 'coupon_id',
});

(async function test() {
  try {
    await sequelize.sync({ force: true });
    const couponDataRecords = [
      { coupon_id: 1, coupon_type: [{ item_type_id: 1 }, { item_type_id: 2 }] },
      { coupon_id: 2, coupon_type: [{ item_type_id: 4 }, { item_type_id: 3 }] },
    ];
    await Coupon.bulkCreate(couponDataRecords, {
      include: [
        {
          model: ItemType,
          as: 'coupon_type',
        },
      ],
    });

    const coupon = await Coupon.findOne({ where: { coupon_id: 1 } });
    const validForType = await coupon.getCoupon_type({
      where: {
        item_type_id: 1,
      },
      attributes: ['id'],
      raw: true,
    });
    console.log('validForType: ', validForType);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
