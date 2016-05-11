// ID3ClassifierService.js - in api/services

var DecisionTree = require('decision-tree');

var features = ["entitie1",
                "entitie2",
                "entitie3",
                "hashtag1",
                "hashtag2",
                "hashtag3",
                "keyword1",
                "keyword2",
                "keyword3",
                "topic1",
                "topic2",
                "topic3"
                ]

var class_to_predict = "principal_topic";

// var training_data = [
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
                // }
//   {"color":"red", "shape":"square", "liked":false},
//   {"color":"blue", "shape":"circle", "liked":true},
//   {"color":"red", "shape":"circle", "liked":true},
//   {"color":"blue", "shape":"hexagon", "liked":false},
//   {"color":"red", "shape":"hexagon", "liked":false},
//   {"color":"yellow", "shape":"hexagon", "liked":true},
//   {"color":"yellow", "shape":"circle", "liked":true}
// ];

// var query = {
//       color: "blue",
//       shape: "hexagon"
// };

var trained = false;
var dt = null;



module.exports = {

    classify: function(query_json,items_to_train) {
        
        delete query_json.principal_topic;
        if(!trained)
        {
            dt = new DecisionTree(items_to_train, class_to_predict, features);
            trained = true;
        }
    	var predicted_class = dt.predict(query_json);
    	var model_to_evaluate = query_json;
    	model_to_evaluate[class_to_predict] = predicted_class;
    	model_to_evaluate = [model_to_evaluate];
    	var accuracy = dt.evaluate(model_to_evaluate);

    	return {
    			'choosen': model_to_evaluate[0],
    			'probability': accuracy
    		};
	}
};