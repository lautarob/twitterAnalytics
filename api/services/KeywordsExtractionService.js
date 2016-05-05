// KeyWordsExtractionService.js - in api/services

module.exports = {

  processText: function(tweetProcessed){
    var keywords = [];
    for (var i = 0; i < tweetProcessed.keywords.length; i++) {
      if(tweetProcessed.keywords[i].text.indexOf("http") < 0){
        keywords.push(tweetProcessed.keywords[i].text);
      }
    }
    return keywords;
  }

};