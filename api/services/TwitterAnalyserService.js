// TwitterAnalyserService.js - in api/services

module.exports = {

    start: function(callback) {

        stream = client.stream('statuses/sample', { language: 'en' });

        stream.on('connected', function (response) {

            callback(response);

        });

        stream.on('tweet', function (tweet) {


            
            TweetsProcessed.create({username:tweet.user.name,text:tweet.text,posted_at:tweet.created_at,country:tweet.user.location,processed:false}).exec(function createCB(err, created){
            })
        });

    },

    stop: function(callback) {

        stream.stop();

        stream.on('disconnect', function (disconnectMessage) {

            callback(disconnectMessage);
        })
    }

};