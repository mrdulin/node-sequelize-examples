import { pubsub } from '../common';

async function feeChargedForOrderHandler(message) {
  console.log('feeChargedForOrder');
  console.log(`[${new Date().toISOString()}] Received message ${message.id}`);
  console.log(`Data: ${message.data}`);
  console.log(`Attributes: ${JSON.stringify(message.attributes)}`);
  message.ack();
}

function stockReservedForOrderHandler(message) {
  console.log('stockReservedForOrder');
  console.log(`[${new Date().toISOString()}] Received message ${message.id}`);
  console.log(`Data: ${message.data}`);
  console.log(`Attributes: ${JSON.stringify(message.attributes)}`);
  message.ack();
}

function registerHandlers() {
  pubsub
    .subscription('feeChargedForOrder')
    .on('message', feeChargedForOrderHandler)
    .on('error', (error) => console.log(error));

  pubsub
    .subscription('stockReservedForOrder')
    .on('message', stockReservedForOrderHandler)
    .on('error', (error) => console.log(error));
}

export { registerHandlers };
