// KnnClassifierService.js - in api/services

var clasiffier = require('nearest-neighbor');
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
  { name: "keyword3", measure: clasiffier.comparisonMethods.word },
  { name: "principal_topic", measure: clasiffier.comparisonMethods.word }
  ];

module.exports = {

  classify: function(query_json,items_to_train) {
    var ret = null;
  	clasiffier.findMostSimilar(query_json,items_to_train,fields_importance, function(nearestNeighbor,probability)
  	{
      query_json.principal_topic = nearestNeighbor.principal_topic;
  		ret = {
  			'choosen': query_json,
  			'probability': probability
  		}
  	})
    return ret;
}
};