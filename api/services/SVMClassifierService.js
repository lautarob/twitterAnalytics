// SVMClassifierService.js - in api/services

var multilabel = require('multilabelsvm' );
var actionClassifier = new multilabel.Classifier({kernel : 'linear'});

module.exports = {

    generateItems: function(items_to_train){
        var items_to_train_modified = [];
        items_to_train.forEach(function(item,index){
            var input = "";
            var output = "";
            for(var k in item)
            {
                if(item[k] != "" && k != "principal_topic")
                {
                    input = input.concat(item[k]+',');
                }
            };
            output = item.principal_topic;
            items_to_train_modified.push({input:input,output:output});
        })
        return items_to_train_modified;   
    },

    train: function(items_to_train) {
        var items_to_train_modified = this.generateItems(items_to_train);
        actionClassifier.trainBatch(items_to_train_modified);
    },

    classify: function(query_string) {
        var classification = actionClassifier.classify(query_string);
        return classification;
    }
};