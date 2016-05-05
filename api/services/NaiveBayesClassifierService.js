// NaiveBayesClassifierService.js - in api/services

var NaiveBayesClassifier = require('NaiveBayesClassifier')
var tokenizerFunction = function(text) { 
    return text.split(',');
};
var classifier = new NaiveBayesClassifier({ tokenizer: tokenizerFunction });

module.exports = {

    generateItems: function(items_to_train){
        var items_to_train_modified = [];
        items_to_train.forEach(function(item,index){
            var train_data = "";
            var result = "";
            for(var k in item)
            {
                if(item[k] != "" && k != "principal_topic")
                {
                    train_data = train_data.concat(item[k]+',');
                }
            };
            result = item.principal_topic;
            items_to_train_modified.push({train_data:train_data,result:result});
        })
        return items_to_train_modified;   
    },

    train: function(items_to_train) {
        var items_to_train_modified = this.generateItems(items_to_train);
        for(var i = 0; i< items_to_train_modified.length; i++ ){
            classifier.learn(items_to_train_modified[i].train_data, items_to_train_modified[i].result);
        };  
    }

    classify: function(query_string,query_json) {
        var classification = classifier.categorize(query_string);
        query_json.principal_topic = classification.category;
    	return {
    			'choosen': query_json,
    			'probability': classification.probability
    		};
	}
};