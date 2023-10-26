const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function setupConsumer() {
  try {
    await consumer.connect();
  } catch (error) {
    console.error('Consumer connection error:', error);
  }
  return consumer;
}

async function subscribeToTopic(consumer, topic) {
  try {
    await consumer.subscribe({ topic, fromBeginning: true });
  } catch (error) {
    console.error('Subscription error:', error);
  }
}

async function startListening(consumer, messageCallback) {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      messageCallback({ topic, partition, message });
    },
  });
}

// async function disconnectConsumer(consumer) {
//   try {
//     await consumer.disconnect();
//   } catch (error) {
//     console.error('Consumer disconnection error:', error);
//   }
// }

module.exports = { setupConsumer, subscribeToTopic, startListening};































































// const { Kafka } = require('kafkajs');

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['localhost:9092'], // Update with your Kafka broker address
// });

// const consumer = kafka.consumer({ groupId: 'test-group' });

// async function setupConsumer() {
//   await consumer.connect();
//   return consumer;
// }

// async function subscribeToTopic(consumer, topic) {
//   await consumer.subscribe({ topic, fromBeginning: true });
// }

// async function startListening(consumer, messageCallback) {
//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       messageCallback({ topic, partition, message });
//     },
//   });
// }

// // async function disconnectConsumer(consumer) {
// //   await consumer.disconnect();
// // }

// module.exports = { setupConsumer, subscribeToTopic, startListening };
