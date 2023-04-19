/* eslint-disable @typescript-eslint/camelcase */
import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class TblA extends Model {}
TblA.init(
  {
    a_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'tbl_a' },
);

class TblB extends Model {}
TblB.init(
  {
    b_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { sequelize, modelName: 'tbl_b' },
);

class TblC extends Model {}
TblC.init(
  {
    c_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { sequelize, modelName: 'tbl_c' },
);

TblA.hasOne(TblB, { foreignKey: 'b_uuid', sourceKey: 'a_uuid', as: 'b' });
TblB.belongsTo(TblA, { foreignKey: 'b_uuid', targetKey: 'a_uuid' });

TblA.hasOne(TblC, { foreignKey: 'c_uuid', sourceKey: 'a_uuid', as: 'c' });
TblC.belongsTo(TblA, { foreignKey: 'c_uuid', targetKey: 'a_uuid' });

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await TblA.create(
      {
        b: {},
        c: {},
      },
      {
        include: [
          { model: TblB, as: 'b' },
          { model: TblC, as: 'c' },
        ],
      },
    );

    // test
    const result = await TblA.findAll({
      include: [
        { model: TblB, as: 'b', required: false },
        { model: TblC, as: 'c', required: false },
      ],
      raw: true,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
