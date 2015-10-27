// ID3ClassifierService.js - in api/services

var DecisionTree = require('decision-tree');

var features = [];
var class_to_predict = "";

// var training_data = [
//   {"color":"blue", "shape":"square", "liked":false},
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

// var class_name = "liked";


module.exports = {

    classifyTweet: function(query_json,items_to_train) {

    	var dt = new DecisionTree(items_to_train, class_to_predict, features);
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