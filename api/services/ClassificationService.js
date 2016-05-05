// ClassificationService.js - in api/services

var items_to_train = [];


module.exports = {

	setItemsToTrain: function(callBackReturn){
    var self = this;
    TweetsProcessed.native(function(err, collection) {
      if (err) return res.serverError(err);

      collection.aggregate([
        { 
          "$project" : {
            "to_train" : 1,
            "principal_topic" : 1,
            "entities" : 1,
            "hashTags" : 1,
            "keyWords" : 1,
            "topics" : 1,
          }
        },
        { "$match" : { "to_train" : true } }//,
       //{ "$limit": 100 }
      ]).toArray(function (err, results) {
        if (err){
          callBackReturn(true);
        }
        results.forEach(function(item,index){
          var tweet = TweetsProcessed.create({
                topics: item.topics,
                entities: item.entities,
                hashTags: item.hashTags,
                principal_topic: item.principal_topic,
                to_train: item.to_train,
                keyWords: item.keyWords
            }); 
          items_to_train.push(self.createQueryJsonKNNID3(tweet));
        })
        callBackReturn(false)
      });
    });
	},

	createJSONQuery: function(tweet){
		var query_json = {
		          "entitie1":"",
		          "entitie2":"",
		          "entitie3":"",
              "hashtag1":"",
              "hashtag2":"",
              "hashtag3":"",
              "keyword1":"",
              "keyword2":"",
              "keyword3":"",
              "topic1":"",
              "topic2":"",
              "topic3":"",
		          "principal_topic":""
		        }

    if(tweet._values.entities[0])
    {
      query_json.entitie1 = tweet._values.entities[0];
    }
    if(tweet._values.entities[1])
    {
      query_json.entitie2 = tweet._values.entities[1];
    }
    if(tweet._values.entities[2])
    {
      query_json.entitie3 = tweet._values.entities[2];
    }

    if(tweet._values.hashTags[0])
    {
      query_json.hashtag1 = tweet._values.hashTags[0];
    }
    if(tweet._values.hashTags[1])
    {
      query_json.hashtag2 = tweet._values.hashTags[1];
    }
    if(tweet._values.hashTags[2])
    {
      query_json.hashtag3 = tweet._values.hashTags[2];
    }

    if(tweet._values.keyWords[0])
    {
      query_json.keyword1 = tweet._values.keyWords[0];
    }
    if(tweet._values.keyWords[1])
    {
      query_json.keyword2 = tweet._values.keyWords[1];
    }
    if(tweet._values.keyWords[2])
    {
      query_json.keyword3 = tweet._values.keyWords[2];
    }

    if(tweet._values.topics[0])
    {
      query_json.topic1 = tweet._values.topics[0];
    }
    if(tweet._values.topics[1])
    {
      query_json.topic2 = tweet._values.topics[1];
    }
    if(tweet._values.topics[2])
    {
      query_json.topic3 = tweet._values.topics[2];
    }
    if(tweet._values.principal_topic)
    {
      query_json.principal_topic = tweet._values.principal_topic;
    }

    return query_json;
	},

	createStringQuery: function(query_json,tweet){
    var query_json_bayes = "";

    for(var k in query_json)
    {
    	if(query_json[k] != "")
    	{
    		query_json_bayes = query_json_bayes.concat(query_json[k]+',');
    	}
    };

   	return query_json_bayes;
	},

  NaiveBayesTrain: function(query_string,query_json){
    return NaiveBayesClassifierService.train(items_to_train);
  },

  SVMTrain: function(query_string,query_json){
    return SVMClassifierService.train(items_to_train);
  }

  KNNClassify: function(query_json){
    return KnnClassifierService.classify(query_json);
	},

	NaiveBayesClassify: function(query_string,query_json){
    return NaiveBayesClassifierService.classify(query_string,query_json);
	},

  SVMClassify: function(query_string,query_json){
    return SVMClassifierService.classify(query_string,query_json);
  }
};