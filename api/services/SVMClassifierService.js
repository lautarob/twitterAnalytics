// SVMClassifierService.js - in api/services

var multilabel = require('multilabelsvm' );
var actionClassifier = new multilabel.Classifier({kernel : 'linear'});

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
var trained = false;

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

  classifyTweet: function(query_string,query_json,items_to_train) {
    var items_to_train_modified = this.generateItems(items_to_train);
    if(!trained){
        actionClassifier.trainBatch(items_to_train_modified);
        trained = true;
    }


    var classification = actionClassifier.classify(query_string);
    query_json.principal_topic = classification;
    return {
      'choosen': query_json
    };

	}
};