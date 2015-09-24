/**
 * TweetsController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
module.exports = {


  start: function (req, res) {

  		TwitterStreamingService.start(function(response){

  			if(response.statusCode == 200)
  			{
  				res.status(200);
  				return res.send("Connection established");
  			}
  			else
			{
				res.status(500);
  				return res.send("Connection cannot be established");
			}
  			

  		});

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

	}


	
};

