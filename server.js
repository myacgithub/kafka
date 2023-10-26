
const express = require('express');
const { setupProducer, sendMessage } = require('./producer');
const { setupConsumer, subscribeToTopic, startListening} = require('./consumer');

const app = express();
const port = 3000; // You can use any port you prefer

app.use(express.json());

async function main() {
  const producer = await setupProducer();
  const consumer = await setupConsumer();

  try {
    await subscribeToTopic(consumer, 'topic-test');

    const messageCallback = ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        value: message.value.toString(),
      });
    };

    await startListening(consumer, messageCallback);

    app.post('/send-message', async (req, res) => {
      const message = req.body.message;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      await sendMessage(producer, 'topic-test', message);
      // console.log('Producer: Message sent successfully');
      res.json({ status: 'Message sent successfully' });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // await disconnectConsumer(consumer);
   // await disconnectProducer(producer);
  }
}

main();







































// const { setupProducer, sendMessage, disconnectProducer } = require('./producer');
// const { setupConsumer, subscribeToTopic, startListening } = require('./consumer');

// async function main() {
//   const producer = await setupProducer();
//   const consumer = await setupConsumer();

//   try {
//     await subscribeToTopic(consumer, 'topic-test');

//     const messageCallback = ({ topic, partition, message }) => {
//       console.log({
//         topic,
//         partition,
//         value: message.value.toString(),
//       });
//     };

//     await startListening(consumer, messageCallback);

//     await sendMessage(producer, 'topic-test', 'Hello KafkaJS user');
//     console.log('Producer: Message sent successfully');
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//    // await disconnectConsumer(consumer);
//     await disconnectProducer(producer);
//   }
// }

// main();




