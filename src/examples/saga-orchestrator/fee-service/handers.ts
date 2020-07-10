import { pubsub } from '../common';

function orderCreatedForFeeHandler(message) {
  console.log('orderCreatedForFee');
  console.log(`[${new Date().toISOString()}] Received message ${message.id}`);
  console.log(`Data: ${message.data}`);
  console.log(`Attributes: ${JSON.stringify(message.attributes)}`);
  message.ack();
}

function registerHandlers() {
  pubsub
    .subscription('orderCreatedForFee')
    .on('message', orderCreatedForFeeHandler)
    .on('error', (error) => console.log(error));
}

export { registerHandlers };
