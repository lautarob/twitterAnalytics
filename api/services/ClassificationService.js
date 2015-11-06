// ClassificationService.js - in api/services

var items_to_train = [];


module.exports = {

	setItemsToTrain: function(callBackReturn){
    var self = this;
    	 TweetsProcessed.native(function(err, collection) {
          if (err) return res.serverError(err);

          collection.aggregate([
           { "$project" : {
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
           ] ).toArray(function (err, results) {
            if (err)
                {
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

	createQueryJsonKNNID3: function(tweet)
	{
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

	createQueryJsonNaiveBayes: function(query_json,tweet)
	{
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

    KNNclassifyTweet: function(query_json) {
		// var items = [
		//   { name: "Bill", age: 10, pc: "Mac", ip: "68.23.13.8" },
		//   { name: "Alice", age: 22, pc: "Windows", ip: "193.186.11.3" },
		//   { name: "Bob", age: 12, pc: "Windows", ip: "56.89.22.1" }
		// ];
		 
		// var query = { name: "Bob", age: 12, pc: "Windows", ip: "68.23.13.10" };
		 
		// var fields = [
		//   { name: "name", measure: nn.comparisonMethods.word },
		//   { name: "age", measure: nn.comparisonMethods.number, max: 100 },
		//   { name: "pc", measure: nn.comparisonMethods.word }, 
		//   { name: "ip", measure: nn.comparisonMethods.ip }
		// ];

    return KnnClassifierService.classifyTweet(query_json,items_to_train);


	},

	ID3classifyTweet: function(query_json) {

		// var training_data = [
	 //      {"color":"blue", "shape":"square", "liked":false},
	 //      {"color":"red", "shape":"square", "liked":false},
	 //      {"color":"blue", "shape":"circle", "liked":true},
	 //      {"color":"red", "shape":"circle", "liked":true},
	 //      {"color":"blue", "shape":"hexagon", "liked":false},
	 //      {"color":"red", "shape":"hexagon", "liked":false},
	 //      {"color":"yellow", "shape":"hexagon", "liked":true},
	 //      {"color":"yellow", "shape":"circle", "liked":true}
	 //  	];

    	return ID3ClassifierService.classifyTweet(query_json,items_to_train);
	},

	NaiveBayesClassifyTweet: function(query_string,query_json) {

		// var items = [
		// 	{
		// 		'train_data': 'amazing, awesome movie!! Yeah!!',
		// 		'result': 'positive'
		// 	},
		// 	{
		// 		'train_data': 'terrible, shitty thing. Damn. Sucks!!',
		// 		'result': 'negative'
		// 	},
		// 	{
		// 		'train_data': 'I dont really know what to make of this.',
		// 		'result': 'negative'
		// 	}
		// ]

        // var trainSet = [
    //   { input:'What is your name',output: "name" },
    //   { input:'how are you',output: "fine"},
    //   { input:'please tell your name please',output: "name" },
    //   { input:'your name please',output: "name" },
    //   { input:'what is your name',output: "name" },
    //   { input:'who am i',output: "listener" },
    //   { input:'who are you ',output: "name" },
    //   { input:'may i know your name',output: "name" },
    //   { input:'your name',output: "name" },
    //   { input:'where you coming from',output: "about" },
    //   { input:'how do you do',output: "fine" },
    //   { input:'how are you doing',output: "fine"},
    //   { input:'how are you',output: "fine"},
    //   { input:'how do you do',output: "fine"},
    //   { input:'how are you',output: "fine"},
    //   { input:'what do you do',output: "fine"},
    //   { input:'can you edit this',output: "edit"}
     
    // ]

    	return NaiveBayesClassifierService.classifyTweet(query_string,query_json,items_to_train);
	},

  SVMClassifyTweet: function(query_string,query_json)
  {
    // var trainSet = [
    //   { input:'What is your name',output: "name" },
    //   { input:'how are you',output: "fine"},
    //   { input:'please tell your name please',output: "name" },
    //   { input:'your name please',output: "name" },
    //   { input:'what is your name',output: "name" },
    //   { input:'who am i',output: "listener" },
    //   { input:'who are you ',output: "name" },
    //   { input:'may i know your name',output: "name" },
    //   { input:'your name',output: "name" },
    //   { input:'where you coming from',output: "about" },
    //   { input:'how do you do',output: "fine" },
    //   { input:'how are you doing',output: "fine"},
    //   { input:'how are you',output: "fine"},
    //   { input:'how do you do',output: "fine"},
    //   { input:'how are you',output: "fine"},
    //   { input:'what do you do',output: "fine"},
    //   { input:'can you edit this',output: "edit"}
     
    // ]

    // var query = 'who are you';
    return SVMClassifierService.classifyTweet(query_string,query_json,items_to_train);
  }
};