// TwitterStreamingService.js - in api/services

var Twit = require('twit')

var twitterClient = new Twit({
  consumer_key: sails.config.twitterconfig.consumer_key,
  consumer_secret: sails.config.twitterconfig.consumer_secret,
  access_token: sails.config.twitterconfig.access_token_key,
  access_token_secret: sails.config.twitterconfig.access_token_secret
})

var stream = null
var trainedAlgorithms = [];
var trained = false;



module.exports = {

  getTrained: function(callback){
    callback(trained);
  },
  getTrainedByAlgorithm: function(algorithm,callback){
    if(trainedAlgorithms.indexOf(algorithm) < 0){
      callback(false);
    }
    else{
      callback(true);
    }
  },

  getTrainedStatus:function(){
    return trained;
  },

  getTrainedStatusByAlgorithm:function(algorithm){
    if(trainedAlgorithms.indexOf(algorithm) < 0){
      return false;
    }
    else{
      return true;
    }
  },

  setTrainedStatus:function(istrained){
    trained = istrained;
  },

  setTrainedAlgorithm:function(algorithm){
    if(!this.getTrainedStatusByAlgorithm(algorithm)){
      trainedAlgorithms.push(algorithm);
    }
  },

  startStreaming: function(endpoint,parameters,callback){
    stream = twitterClient.stream(endpoint,parameters);
    stream.on('connected', function (response) {
      callback(response);
    });
    stream.on('tweet', function (tweetOriginal) {
      TwitterAnalyserService.processTweet(tweetOriginal,function(tweet){
        if(tweet != null){
          tweet.exec(function createCB(err, created){});
        }
      }); 
    });       
  },

  startStreamingAndClassification: function(endpoint,parameters,algorithm,callback) {

    stream = twitterClient.stream(endpoint,parameters);

    stream.on('connected', function (response) {

      callback(response);

    });

    stream.on('tweet', function (tweetOriginal) {

      TwitterAnalyserService.processTweet(tweetOriginal,function(tweet)
      {
        //var classification = ClassificationService.ID3classifyTweet(query_json);
        if(tweet != null){
          if(algorithm == 'SVM'){
            // SVM
            var query_json = ClassificationService.createJSONQuery(tweet);
            var query_string = ClassificationService.createStringQuery(query_json);
            if(!TwitterStreamingService.getTrainedStatusByAlgorithm('SVM')){
              ClassificationService.SVMTrain();
              TwitterStreamingService.setTrainedAlgorithm('SVM');
            }
            var principal_topic = ClassificationService.SVMClassify(query_string);
            tweet.principal_topic = principal_topic;
          }else if(algorithm == 'NaiveBayes'){
            // NAIVE BAYES
            var query_json = ClassificationService.createJSONQuery(tweet);
            var query_string = ClassificationService.createStringQuery(query_json);
            if(!TwitterStreamingService.getTrainedStatusByAlgorithm('NaiveBayes')){
              ClassificationService.NaiveBayesTrain();
              TwitterStreamingService.setTrainedAlgorithm('NaiveBayes');
            }
            var principal_topic = ClassificationService.NaiveBayesClassify(query_string);
            tweet.principal_topic = principal_topic;
          }else if(algorithm == 'KNN'){
            // KNN
            var query_json = ClassificationService.createJSONQuery(tweet);
            var principal_topic = ClassificationService.KNNClassify(query_json);
            tweet.principal_topic = principal_topic;
          }
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

  train: function(algorithm,callback){
    if(algorithm == 'SVM'){
      ClassificationService.SVMTrain();
      TwitterStreamingService.setTrainedAlgorithm('SVM');
      callback(true);
    }
    else if(algorithm == 'NaiveBayes'){
      ClassificationService.NaiveBayesTrain();
      TwitterStreamingService.setTrainedAlgorithm('NaiveBayes');
      callback(true);
    }
  }

};