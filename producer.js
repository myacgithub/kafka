const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function setupProducer() {
  try {
    await producer.connect();
  } catch (error) {
    console.error('Producer connection error:', error);
  }
  return producer;
}

async function sendMessage(producer, topic, message) {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log('Producer: Message sent successfully');
  } catch (error) {
    console.error('Producer send error:', error);
  }
}

// async function disconnectProducer(producer) {
//   try {
//     await producer.disconnect();
//   } catch (error) {
//     console.error('Producer disconnection error:', error);
//   }
// }

module.exports = { setupProducer, sendMessage };







































// const { Kafka } = require('kafkajs');

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['localhost:9092'], 
// });

// const producer = kafka.producer();

// async function setupProducer() {
//   await producer.connect();
//   return producer;
// }

// async function sendMessage(producer, topic, message) {
//   await producer.send({
//     topic,
//     messages: [{ value:JSON.stringify(message) }],
//   });
// }

// async function disconnectProducer(producer) {
//   await producer.disconnect();
// }

// module.exports = { setupProducer, sendMessage, disconnectProducer };

