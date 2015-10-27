// NaiveBayesClassifierService.js - in api/services

var NaiveBayesClassifier = require('NaiveBayesClassifier')
var tokenizerFunction = function(text) { 
    return text.split(',');
};
var classifier = new NaiveBayesClassifier({ tokenizer: tokenizerFunction });

// var items = [ {train_data:'sex,love,maroon five', result:'positive'},
//   {train_data:'terrible,shit, Damn, Sucks!!', result:'negative'},
//   {train_data:'putas,conos,idiotas', result:'neutral'}]

// var query = 'terrible'

module.exports = {

    classifyTweet: function(query,items_to_train) {

        for(var i = 0; i< items_to_train.length; i++ ){
            classifier.learn(items_to_train[i].train_data, items_to_train[i].result);
        };

        var classification = classifier.categorize(query);
    	return {
    			'choosen': classification.category,
    			'probability': classification.probability
    		};
	}
};