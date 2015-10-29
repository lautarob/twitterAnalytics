// KnnClassifierService.js - in api/services

var clasiffier = require('nearest-neighbor');

var fields_importance = [];

// var items = [
//   {
            //   "topic1":"",
            //   "topic2":"",
            //   "topic3":"",
            //   "entitie1":"",
            //   "entitie2":"",
            //   "entitie3":"",
            //   "hashtag1":"",
            //   "hashtag2":"",
            //   "hashtag3":"",
            //   "keyword1":"",
            //   "keyword2":"",
            //   "keyword3":"",
            //   "principalTopic":""
            // },
//   { name: "Alice", age: 22, pc: "Windows", ip: "193.186.11.3" },
//   { name: "Bob", age: 12, pc: "Windows", ip: "56.89.22.1" }
// ];

// var fields_importance = [
//   { name: "name", measure: clasiffier.comparisonMethods.word },
//   { name: "age", measure: clasiffier.comparisonMethods.number, max: 100 },
//   { name: "pc", measure: clasiffier.comparisonMethods.word }, 
//   { name: "ip", measure: clasiffier.comparisonMethods.ip }
// ];

var fields_importance = [
  { name: "topic1", measure: clasiffier.comparisonMethods.word },
  { name: "topic2", measure: clasiffier.comparisonMethods.word },
  { name: "topic3", measure: clasiffier.comparisonMethods.word }, 
  { name: "entitie1", measure: clasiffier.comparisonMethods.word },
  { name: "entitie2", measure: clasiffier.comparisonMethods.word },
  { name: "entitie3", measure: clasiffier.comparisonMethods.word }, 
  { name: "hashtag1", measure: clasiffier.comparisonMethods.word },
  { name: "hashtag2", measure: clasiffier.comparisonMethods.word },
  { name: "hashtag3", measure: clasiffier.comparisonMethods.word },
  { name: "keyword1", measure: clasiffier.comparisonMethods.word },
  { name: "keyword2", measure: clasiffier.comparisonMethods.word },
  { name: "keyword3", measure: clasiffier.comparisonMethods.word }
  ];

// var query = { name: "Bob", age: 12, pc: "Windows", ip: "68.23.13.10" };

module.exports = {

    classifyTweet: function(query_json,items_to_train) {
    	clasiffier.findMostSimilar(query_json,items_to_train,fields_importance, function(nearestNeighbor,probability)
    	{
        query_json.principalTopic = nearestNeighbor.principalTopic;
    		return {
    			'choosen': query_json,
    			'probability': probability
    		}
    	})
	}
};