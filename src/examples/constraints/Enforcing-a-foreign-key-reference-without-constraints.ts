import { sequelize } from '../db';
import Sequelize, { Model, DataTypes } from 'sequelize';

class Trainer extends Model {}
Trainer.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  },
  { sequelize, modelName: 'trainer' },
);

// Series will have a trainerId = Trainer.id foreign reference key
// after we call Trainer.hasMany(series)
class Series extends Model {}
Series.init(
  {
    title: Sequelize.STRING,
    subTitle: Sequelize.STRING,
    description: Sequelize.TEXT,
    // Set FK relationship (hasMany) with `Trainer`
    trainerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Trainer,
        key: 'id',
      },
    },
  },
  { sequelize, modelName: 'series' },
);

// Video will have seriesId = Series.id foreign reference key
// after we call Series.hasOne(Video)
class Video extends Model {}
Video.init(
  {
    title: Sequelize.STRING,
    sequence: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    // set relationship (hasOne) with `Series`
    seriesId: {
      type: DataTypes.INTEGER,
      references: {
        model: Series, // Can be both a string representing the table name or a Sequelize model
        key: 'id',
      },
    },
  },
  { sequelize, modelName: 'video' },
);

(async function test() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
