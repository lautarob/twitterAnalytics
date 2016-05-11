// EntitiesExtractionService.js - in api/services

module.exports = {

  processText: function(tweetProcessed){
    var entities = [];
    for (var i = 0; i < tweetProcessed.entities.length; i++){
      if(tweetProcessed.entities[i].text.indexOf("http") < 0){
        entities.push(tweetProcessed.entities[i].text);
      }
    }
    return entities;
  }

};