import { Order, sequelize } from './model';
import express from 'express';
import { pubsub, actions } from '../common';
import { registerHandlers } from './handlers';
import { v1 as uuidv1 } from 'uuid';

(async function bootstrap() {
  console.log('boostrap order service');
  try {
    await Order.sync({ force: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  registerHandlers();
  const app = express();
  const port = 3000;
  app.get('/order/create', async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const order = await Order.create({ status: 'pending', transactionId: uuidv1() }, { transaction: t });
      await pubsub.topic(actions.orderCreated.topic).publishJSON(order);
      await t.commit();
      res.send('created order success');
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  });
  app.listen(port, () => console.log(`Order service endpoint: http://localhost:${port}`));
})();
