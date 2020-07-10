import { PubSub } from '@google-cloud/pubsub';
import './env';

const { PUBSUB_PROJECT_ID, PUBSUB_EMULATOR_HOST } = process.env;
console.log('PUBSUB_EMULATOR_HOST:', PUBSUB_EMULATOR_HOST);
console.log('PUBSUB_PROJECT_ID:', PUBSUB_PROJECT_ID);
const pubsub = new PubSub({ projectId: process.env.PUBSUB_PROJECT_ID });

const actions = {
  orderCreated: {
    topic: 'orderCreated',
    subscriptions: ['orderCreatedForFee', 'orderCreatedForAccount'],
  },
  feeCharged: {
    topic: 'feeCharged',
    subscriptions: ['feeChargedForOrder'],
  },
  stockReserved: {
    topic: 'stockReserved',
    subscriptions: ['stockReservedForOrder'],
  },
  orderPrepared: {
    topic: 'orderPrepared',
    subscriptions: ['orderPreparedForMarket'],
  },
  orderFailed: {
    topic: 'orderFailed',
    subscriptions: ['orderFailed'],
  },
  orderCancelled: {
    topic: 'orderCancelled',
    subscriptions: ['orderCancelledForFee', 'orderCancelledForAccount'],
  },
  feeCancelled: {
    topic: 'feeCancelled',
    subscriptions: ['feeCancelledForOrder'],
  },
  lockCancelled: {
    topic: 'lockCancelled',
    subscriptions: ['lockCancelledForOrder'],
  },
};

async function createTopic(topicName: string) {
  const [topic] = await pubsub.createTopic(topicName);
  console.log(`Topic ${topicName} created.`);
  return topic;
}

async function createSubscription(topicName: string, subscriptionName: string) {
  await pubsub.topic(topicName).createSubscription(subscriptionName);
  console.log(`Subscription ${subscriptionName} created.`);
}

(async function init() {
  const tasks = Object.keys(actions).map((k) => {
    const action = actions[k];
    const topic = pubsub.topic(action.topic);

    return topic.exists().then(([exists]) => {
      if (exists) return;
      return createTopic(action.topic).then((_) => {
        return Promise.all(action.subscriptions.map((sub) => createSubscription(action.topic, sub)));
      });
    });
  });
  await Promise.all(tasks);
})();

export { pubsub, actions };
