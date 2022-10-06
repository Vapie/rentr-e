function main(
    subscriptionNameOrId = 'dmi2-9',
    timeout = 60
  ) {
    timeout = Number(timeout);
  
    // [START pubsub_subscriber_async_pull]
    // [START pubsub_quickstart_subscriber]
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';
    // const timeout = 60;
  
    // Imports the Google Cloud client library
    const {PubSub} = require('@google-cloud/pubsub');
  
    // Creates a client; cache this for further use
    const pubSubClient = new PubSub();
  
    function listenForMessages() {
      // References an existing subscription
      const subscription = pubSubClient.subscription(subscriptionNameOrId);
  
      // Create an event handler to handle messages
      let messageCount = 0;
      const messageHandler = message => {
        console.log(`Received message ${message.id}:`);
        console.log(`\tData: ${message.data}`);
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;
  
        // "Ack" (acknowledge receipt of) the message
        message.ack();
      };
  
      // Listen for new messages until timeout is hit
      subscription.on('message', messageHandler);
  
      setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} message(s) received.`);
      }, timeout * 1000);
    }
  
    listenForMessages();
    // [END pubsub_subscriber_async_pull]
    // [END pubsub_quickstart_subscriber]
  }
  
  main(...process.argv.slice(2));