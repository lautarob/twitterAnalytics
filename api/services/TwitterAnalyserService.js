// TwitterAnalyserService.js - in api/services

var AlchemyAPI = require('alchemy-api');
var async = require('async');

var alchemyClient = new AlchemyAPI(sails.config.alchemyconfig.alchemy_key);


module.exports = {

    processTweet: function(tweetOriginal,returnCallback) {

        this.alchemyApiProcess(tweetOriginal,function(tweetProcessed){

            var entities = [];
            var topics = [];
            var geography = [];
            var hashTags = [];
            var persons = [];
            var users = [];
            var keys = [];
            var numberOfTopics = 0;

            if(tweetProcessed.entities != undefined && tweetProcessed.taxonomies != undefined && tweetProcessed.keywords != undefined)
            {
                for (var i = 0; i < tweetProcessed.entities.length; i++) {
                    if(tweetProcessed.entities[i].text.indexOf("http") < 0)
                    {
                        entities.push(tweetProcessed.entities[i].text);
                        switch(tweetProcessed.entities[i].type) {
                            case "Country":
                            case "City":
                            case "StateOrCounty":
                                geography.push(tweetProcessed.entities[i].text);
                                break;
                            case "Hashtag":
                                hashTags.push(tweetProcessed.entities[i].text);
                                break;
                            case "TwitterHandle":
                                users.push(tweetProcessed.entities[i].text);
                                break;
                            case "Person":
                                persons.push(tweetProcessed.entities[i].text);
                                break;
                        }   
                    }
                }

                for (var i = 0; i < tweetProcessed.keywords.length; i++) {
                    if(tweetProcessed.keywords[i].text.indexOf("http") < 0)
                    {
                        keys.push(tweetProcessed.keywords[i].text);
                    }
                }

                if(tweetProcessed.taxonomies.length > 0){
                    for (var i = 0; i < tweetProcessed.taxonomies.length; i++)
                    {
                        if(parseFloat(tweetProcessed.taxonomies[i].score) > 0.4){
                            var topics_by_taxonomy = tweetProcessed.taxonomies[i].label.substring(1).split('/');
                            for(var j = topics_by_taxonomy.length-1; j > -1; j--)
                            {
                                topics = topics.concat(topics_by_taxonomy[j]);  
                            }
                        }
                    }
                }
                if(topics.length > 0)
                {
                    var tweet = TweetsProcessed.create({
                        userName: tweetOriginal.user.name,
                        originalText: tweetOriginal.text,
                        topics: topics,
                        entities: entities,
                        hashTags: hashTags,
                        persons: persons,
                        geography: geography,
                        twitterUsers: users,
                        keyWords: keys,
                        posted_at: new Date(tweetOriginal.created_at),
                        country: tweetOriginal.user.location,
                        filter_id: 1, //dato que no se usa
                        category: tweetProcessed.category
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