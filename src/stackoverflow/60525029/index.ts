import { sequelize } from '../../examples/db';
import { Model, DataTypes } from 'sequelize';

class ClassifiedTemplate extends Model {}
ClassifiedTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    temp_body: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ad_type_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  { sequelize, modelName: 'classified_template', tableName: 'classified_template' },
);

class AdType extends Model {}
AdType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'ad_type', tableName: 'ad_type' },
);

ClassifiedTemplate.hasOne(AdType, { foreignKey: 'id', sourceKey: 'ad_type_id' });
AdType.belongsTo(ClassifiedTemplate, { foreignKey: 'id', targetKey: 'ad_type_id' });

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // seed
    await ClassifiedTemplate.create(
      {
        temp_body: 'temp_body',
        ad_type_id: 1,
        ad_type: {
          name: 'ad type name',
        },
      },
      { include: [AdType] },
    );
    // test
    const result = await AdType.findAndCountAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: ClassifiedTemplate,
          where: {
            is_deleted: false,
          },
        },
      ],
    });
    console.log('result:', result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
