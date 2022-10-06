const formValidator = require('./form_validator');
const photoModel = require('./photo_model');
// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

async function quickstart(
  projectId = 'leadtechnique2022', // Your Google Cloud Platform project ID
  topicNameOrId = 'dmi2-9', // Name for the new topic to create
  subscriptionName = 'dmi2-8' // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  // Creates a new topic
  const topic = await pubsub.topic(topicNameOrId);
  console.log(`Topic ${topic.name} retrieved.`);

  // // Creates a subscription on that new topic
  const subscription = await topic.subscription(subscriptionName);

  // Receive callbacks for new messages on the subscription
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());
    process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on('error', error => {
    console.error('Received error:', error);
    process.exit(1);
  });

  // // Send a message to the topic
  topic.publish(Buffer.from('*sending* ondes venues d"un autre monde!'));
}
function route(app) {
  app.get('/', (req, res) => {
    const tags = req.query.tags;
    const tagmode = req.query.tagmode;

    const ejsLocalVariables = {
      tagsParameter: tags || '',
      tagmodeParameter: tagmode || '',
      photos: [],
      searchResults: false,
      invalidParameters: false
    };

    // if no input params are passed in then render the view with out querying the api
    if (!tags && !tagmode) {
      return res.render('index', ejsLocalVariables);
    }

    // validate query parameters
    if (!formValidator.hasValidFlickrAPIParams(tags, tagmode)) {
      ejsLocalVariables.invalidParameters = true;
      return res.render('index', ejsLocalVariables);
    }

    // get photos from flickr public feed api
    return photoModel
      .getFlickrPhotos(tags, tagmode)
      .then(photos => {
        ejsLocalVariables.photos = photos;
        ejsLocalVariables.searchResults = true;
        ejsLocalVariables.tags = tags
        return res.render('index', ejsLocalVariables);
      })
      .catch(error => {
        return res.status(500).send({ error });
      });
  });
  app.post('/zip', function (req, res) {
    const tags = req.query.tags; 
    console.log(tags);
    quickstart()
    
  });
}

module.exports = route;
