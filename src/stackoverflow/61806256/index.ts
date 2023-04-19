import { sequelize } from '../../examples/db';
import { DataTypes, Model, Op } from 'sequelize';

class MatterResource extends Model {}
MatterResource.init(
  {
    attached_resources: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      defaultValue: [],
    },
  },
  { sequelize, modelName: 'matter_resource' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
    // seed
    await MatterResource.bulkCreate([
      { attached_resources: [{ public_id: 1 }] },
      { attached_resources: [{ public_id: 2 }] },
      { attached_resources: [{ public_id: 3 }] },
    ]);
    // test
    const resource = await MatterResource.destroy({
      where: {
        attached_resources: {
          [Op.contains]: [{ public_id: 1 }],
        },
      },
    });
    console.log(resource);
  } catch (error) {
    console.log(error);
  } finally {
    sequelize.close();
  }
})();
