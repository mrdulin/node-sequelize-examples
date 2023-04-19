import { sequelize } from '../../examples/db';
import Sequelize, { Model } from 'sequelize';

class FrameworkPage extends Model {}
FrameworkPage.init({}, { sequelize, modelName: 'frameworkPage' });

(async function test() {
  try {
    // create tables
    await sequelize.sync({ force: true });
    // seed
    await FrameworkPage.create({});
    // test
    const req = { body: { data: 'select * from "frameworkPage"' } };
    const result = await sequelize.query(req.body.data, { type: Sequelize.QueryTypes.SELECT });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
