/**
 * TweetsController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
 module.exports = {

  startStreamingAndClassification: function (req, res) {

    var endpoint = req.body.endpoint;
    var parameters = req.body.parameters;
    var algorithm = req.body.algorithm;

    TwitterStreamingService.startStreamingAndClassification(endpoint,parameters,algorithm,function(response){
      if(response.statusCode == 200){
        res.status(200);
        return res.send("Connection established");
      }
      else{
        res.status(500);
        return res.send("Connection cannot be established");
      }
    });

  },

  startStreaming: function (req, res) {

    var endpoint = req.body.endpoint;
    var parameters = req.body.parameters;

    TwitterStreamingService.startStreaming(endpoint,parameters,function(response){
      if(response.statusCode == 200){
        res.status(200);
        return res.send("Connection established");
      }
      else{
        res.status(500);
        return res.send("Connection cannot be established");
      }
    });

  },

  train: function (req, res) {
    var algorithm = req.body.algorithm;
    TwitterStreamingService.train(algorithm,function(response){
      return res.send(response);
    })
  },

  getTrained: function(req, res){
    TwitterStreamingService.getTrained(function(response){
      return res.send(response);
    })
  },

  getTrainedByAlgorithm: function(req, res){
    var algorithm = req.body.algorithm;
    TwitterStreamingService.getTrainedByAlgorithm(algorithm,function(response){
      return res.send(response);
    })
  },

  stop: function (req, res) {

    TwitterStreamingService.stop(function(message){

     if(message != null)
     {
      res.status(200);
      return res.send("Desconnection Ok");
    }
    else
    {
      res.status(500);
      return res.send("Cannot be desconnected");
    }

  });

    res.status(200);

  },

  setItemsToTrain: function(req,res)
  {
    ClassificationService.setItemsToTrain(function(err)
    {
      if(err)
      {
        res.status(500);
        return res.send("Error trying to set items to train");
      }
      else
      {
        res.status(200);
        return res.send("Items OK");
      }
    })
  }

};

