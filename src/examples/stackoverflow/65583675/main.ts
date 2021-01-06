// @ts-nocheck
import { sequelize as db } from '../../db';
import { DataTypes } from 'sequelize';

const student = db.define('student', {
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER(2),
    allowNull: false,
    defaultValue: -1,
  },
});

const task = async () => {
  try {
    await db
      .sync()
      .then(() => console.log('Connection Established'))
      .catch((err) => console.log(err));

    //Insert a Student
    for (let i = 0; i < 30; i++) {
      await student.create({
        name: ['Tom', 'Dick', 'Van Dijk', 'Muller', 'Virat', 'Allison'][parseInt(Math.random() * 6)],
        age: 10 * parseInt(Math.random() * 10),
      });
    }
  } catch (e) {
    console.error(e);
  }
};

task();
