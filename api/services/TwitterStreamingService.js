// TwitterStreamingService.js - in api/services

var Twit = require('twit')

var twitterClient = new Twit({
  consumer_key: sails.config.twitterconfig.consumer_key,
  consumer_secret: sails.config.twitterconfig.consumer_secret,
  access_token: sails.config.twitterconfig.access_token_key,
  access_token_secret: sails.config.twitterconfig.access_token_secret
})

var stream = null


module.exports = {

  start: function(endpoint,parameters,callback) {

    stream = twitterClient.stream(endpoint,parameters);

    stream.on('connected', function (response) {

      callback(response);

    });

    stream.on('tweet', function (tweetOriginal) {

      TwitterAnalyserService.processTweet(tweetOriginal,function(tweet)
      {
        //var query_json = ClassificationService.createQueryJsonKNNID3(tweet);
        //var query_string = ClassificationService.createQueryJsonNaiveBayes(query_json);
        
        tweet.exec(function createCB(err, created){});
      });

    });        

  },

  stop: function(callback) {

    stream.stop();

    stream = null;

    callback('disconnectMessage');

  },

  status: function(callback){
    if(stream != null)
    {
      callback('Online');
    }
    else
    {
      callback(null);
    }
  }

};