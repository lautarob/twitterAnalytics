// ClassificationService.js - in api/services

module.exports = {

    KNNclassifyTweet: function(query_json,items_to_train) {

		// var items = [
		//   { name: "Bill", age: 10, pc: "Mac", ip: "68.23.13.8" },
		//   { name: "Alice", age: 22, pc: "Windows", ip: "193.186.11.3" },
		//   { name: "Bob", age: 12, pc: "Windows", ip: "56.89.22.1" }
		// ];
		 
		// var query = { name: "Bob", age: 12, pc: "Windows", ip: "68.23.13.10" };
		 
		// var fields = [
		//   { name: "name", measure: nn.comparisonMethods.word },
		//   { name: "age", measure: nn.comparisonMethods.number, max: 100 },
		//   { name: "pc", measure: nn.comparisonMethods.word }, 
		//   { name: "ip", measure: nn.comparisonMethods.ip }
		// ];

    	return KnnClassifierService.classifyTweet(query_json,items_to_train);
	},

	ID3classifyTweet: function(query_json,items_to_train) {

		// var training_data = [
	 //      {"color":"blue", "shape":"square", "liked":false},
	 //      {"color":"red", "shape":"square", "liked":false},
	 //      {"color":"blue", "shape":"circle", "liked":true},
	 //      {"color":"red", "shape":"circle", "liked":true},
	 //      {"color":"blue", "shape":"hexagon", "liked":false},
	 //      {"color":"red", "shape":"hexagon", "liked":false},
	 //      {"color":"yellow", "shape":"hexagon", "liked":true},
	 //      {"color":"yellow", "shape":"circle", "liked":true}
	 //  	];

    	return ID3ClassifierService.classifyTweet(query_json,items_to_train);
	},

	NaiveBayesClassifyTweet: function(query_json,items_to_train) {

		// var items = [
		// 	{
		// 		'train_data': 'amazing, awesome movie!! Yeah!!',
		// 		'result': 'positive'
		// 	},
		// 	{
		// 		'train_data': 'terrible, shitty thing. Damn. Sucks!!',
		// 		'result': 'negative'
		// 	},
		// 	{
		// 		'train_data': 'I dont really know what to make of this.',
		// 		'result': 'negative'
		// 	}
		// ]

    	return NaiveBayesClassifierService.classifyTweet(query_json,items_to_train);
	}
};