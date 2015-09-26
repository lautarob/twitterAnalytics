// TwitterStreamingService.js - in api/services

var Twit = require('twit')
var AlchemyAPI = require('alchemy-api');

var twitterClient = new Twit({
  consumer_key: sails.config.twitterconfig.consumer_key,
  consumer_secret: sails.config.twitterconfig.consumer_secret,
  access_token: sails.config.twitterconfig.access_token_key,
  access_token_secret: sails.config.twitterconfig.access_token_secret
})

var alchemyClient = new AlchemyAPI(sails.config.alchemyconfig.alchemy_key);

var stream = null


module.exports = {

  start: function(callback) {

    stream = twitterClient.stream('statuses/sample', { language: 'en' });

    stream.on('connected', function (response) {

      callback(response);

    });

    stream.on('tweet', function (tweetOriginal) {

          // Aca hay que hacer la magia de analizado

          var tweet = null

          TweetsProcessed.create({
            username:tweet.user.name,
            text:tweet.text,
            posted_at:tweet.created_at,
            country:tweet.user.location,
            filter_id:12
          }).exec(function createCB(err, created){})
        });

  },

  stop: function(callback) {

    stream.stop();

    stream.on('disconnect', function (disconnectMessage) {

      callback(disconnectMessage);
    })
  }

};