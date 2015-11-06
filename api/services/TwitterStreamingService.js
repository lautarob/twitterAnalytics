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
        if(tweet != null)
        {
          var query_json = ClassificationService.createQueryJsonKNNID3(tweet);
          var query_string = ClassificationService.createQueryJsonNaiveBayes(query_json);
          //var classification = ClassificationService.ID3classifyTweet(query_json);
          // KNN
          // var classification = ClassificationService.KNNclassifyTweet(query_json);
          // tweet.principal_topic = classification.choosen.principal_topic;
          //
          // NAIVE BAYES
          //var classification = ClassificationService.NaiveBayesClassifyTweet(query_string,query_json);
          //tweet.principal_topic = classification.choosen.principal_topic;
          //
          // NAIVE BAYES
          var classification = ClassificationService.SVMClassifyTweet(query_string,query_json);
          tweet.principal_topic = classification.choosen.principal_topic;

          //
          tweet.exec(function createCB(err, created){});
        }
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