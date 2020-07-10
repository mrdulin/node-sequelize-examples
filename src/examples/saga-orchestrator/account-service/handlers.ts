import { pubsub } from '../common';
import { Account } from './model';

async function orderCreatedForAccountHandler(message) {
  console.log('orderCreatedForAccount');
  console.log(`[${new Date().toISOString()}] Received message ${message.id}`);
  console.log(`Data: ${message.data}`);
  console.log(`Attributes: ${JSON.stringify(message.attributes)}`);
  try {
    await Account.create({ transactionId: message.data.transactionId });
    message.ack();
  } catch (error) {
    console.log(error);
    // TODO: publish create account failed event
  }
}

function registerHandlers() {
  pubsub
    .subscription('orderCreatedForAccount')
    .on('message', orderCreatedForAccountHandler)
    .on('error', (error) => console.log(error));
}

export { registerHandlers };
