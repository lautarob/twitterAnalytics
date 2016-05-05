// CandidateTopicsExtractionService.js - in api/services

module.exports = {

  processText: function(tweetProcessed){
    var topics = [];
    if(tweetProcessed.taxonomies.length > 0){
	    for (var i = 0; i < tweetProcessed.taxonomies.length; i++){
	    	if(parseFloat(tweetProcessed.taxonomies[i].score) > 0.4){
	       		var topics_by_taxonomy = tweetProcessed.taxonomies[i].label.substring(1).split('/');
	        	for(var j = topics_by_taxonomy.length-1; j > -1; j--){
	            	topics = topics.concat(topics_by_taxonomy[j]);  
	            }
	        }
	    }
	}
    return topics;
  }

};