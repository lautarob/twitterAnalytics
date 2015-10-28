// KnnClassifierService.js - in api/services

var clasiffier = require('nearest-neighbor');

var fields_importance = [];

// var items = [
//   { name: "Bill", age: 10, pc: "Mac", ip: "68.23.13.8" },
//   { name: "Alice", age: 22, pc: "Windows", ip: "193.186.11.3" },
//   { name: "Bob", age: 12, pc: "Windows", ip: "56.89.22.1" }
// ];

// var fields_importance = [
//   { name: "name", measure: clasiffier.comparisonMethods.word },
//   { name: "age", measure: clasiffier.comparisonMethods.number, max: 100 },
//   { name: "pc", measure: clasiffier.comparisonMethods.word }, 
//   { name: "ip", measure: clasiffier.comparisonMethods.ip }
// ];

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