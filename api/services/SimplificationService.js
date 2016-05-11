// SimplificationService.js - in api/services

var stopwordsAndConnectors = require('stopwords').english
var _ = require('lodash');

module.exports = {

  simplify: function(text){
  	var arrayOfTextNormalized = text.toLowerCase().replace(/['";:,.\/?\\-]/g, '').split(' ');

    words = _.filter(arrayOfTextNormalized,function(word){
        return (_.indexOf(stopwordsAndConnectors,word.toLowerCase())==-1);
	});
	words = _.remove(words, function(word) {
	  return word != "";
	});

	var cleanText = words.join(' ');
    return cleanText;
  }

};