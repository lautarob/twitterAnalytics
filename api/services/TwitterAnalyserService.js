// TwitterAnalyserService.js - in api/services

var AlchemyAPI = require('alchemy-api');
var async = require('async');

var alchemyClient = new AlchemyAPI(sails.config.alchemyconfig.alchemy_key);


module.exports = {

    processTweet: function(tweetOriginal,returnCallback) {
        this.alchemyApiProcess(tweetOriginal,function(tweetProcessed){
            if(tweetProcessed.entities != undefined && tweetProcessed.taxonomies != undefined && tweetProcessed.keywords != undefined){
                var entities = EntitiesExtractionService.processText(tweetProcessed);
                var keywords = KeywordsExtractionService.processText(tweetProcessed);
                var topics = CandidateTopicsExtractionService.processText(tweetProcessed);

                if(topics.length > 2)
                {
                    var tweet = TweetsProcessed.create({
                        userName: tweetOriginal.user.name,
                        originalText: tweetOriginal.text,
                        topics: topics,
                        entities: entities,
                        principal_topic: "",
                        to_train: false,
                        keyWords: keywords,
                        posted_at: new Date(tweetOriginal.created_at)
                    }); 
                    returnCallback(tweet);
                }  
                else
                {
                    returnCallback(null);
                }  
            }
        })
    },

    alchemyApiProcess: function(tweetOriginal,returnCallback){
        var tweetProcessed = null;
        var text = SimplificationService.simplify(tweetOriginal.text);

        async.parallel([
         function(callback) {
            alchemyClient.entities(text, {}, function(err, response) {
              if (err)
              {
                console.log(err);
                callback(true);
                return;
            }
            callback(false,response.entities);
        });
        },
        function(callback) {
            alchemyClient.keywords(text, {}, function(err, response) {
              if (err)
              {
                console.log(err);
                callback(true);
                return;
            }
            callback(false,response.keywords);
        });
        },
        function(callback) {
            alchemyClient.taxonomies(text, {}, function(err, response) {
              if (err)
              {
                console.log(err);
                callback(true);
                return;
            }
            callback(false,response.taxonomy);
        });
        }
        ],
        function(err, results) {
            if(err)
            {
                console.log(err);
                return;
            }
            tweetProcessed = {
                entities: results[0],
                keywords: results[1],
                taxonomies: results[2],
            }
            

            returnCallback(tweetProcessed);
        }
        );
    }
};