// TwitterAnalyserService.js - in api/services

var AlchemyAPI = require('alchemy-api');
var async = require('async');

var alchemyClient = new AlchemyAPI(sails.config.alchemyconfig.alchemy_key);


module.exports = {

    processTweet: function(tweetOriginal,returnCallback) {

        this.alchemyApiProcess(tweetOriginal,function(tweetProcessed){

            // Aca hay que hacer la magia de analizado sobre alchemy

            //Elegir las taxonomies o temas mas importanes bajo algun criterio y separar las taxonomies que tienen barras
            //Entidades meterlas todas
            //Keywords meterlas todas
            //Categoria meterla

            var tweet = TweetsProcessed.create({

                userName: '',
                originalText: '',
                topics: [],
                entities: [],
                hashTags: [],
                persons: [],
                geography: [],
                twitterUsers: [],
                keyWords: [],
                posted_at: '',
                country: '',
                filter_id: ''
                
            });

            returnCallback(tweet);

        })

    },

    alchemyApiProcess: function(tweetOriginal,returnCallback){

        tweetProcessed = null;

        async.parallel([
         function(callback) {
            alchemyClient.entities(tweetOriginal.text, {}, function(err, response) {
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
            alchemyClient.keywords(tweetOriginal.text, {}, function(err, response) {
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
            alchemyClient.taxonomies(tweetOriginal.text, {}, function(err, response) {
              if (err)
              {
                console.log(err);
                callback(true);
                return;
            }
            callback(false,response.taxonomy);
        });
        },
        function(callback) {
            alchemyClient.category(tweetOriginal.text, {}, function(err, response) {
              if (err)
              {
                console.log(err);
                callback(true);
                return;
            }
            callback(false,response.category);
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
                category: results[3]
            }
            

            returnCallback(tweetProcessed);
        }
        );
    }




};