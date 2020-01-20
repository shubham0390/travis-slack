var express = require('express');
var bodyParser = require('body-parser');
var rqst = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response) {
  response.send("Hello World")  
});

app.post("/slack-request", function(httpRequest, httpResponse) {
  var cmdPattern = /deploy ([\w:\w ])*/i;
  if (httpRequest.body.text) {
    var commandText = httpRequest.body.text
    console.log("text",httpRequest.body.text)
    var commands = commandText.split(" ")
    console.log("command Array ",commands)
    var repoName = commands[1];
    var branch = commands[2]; 
    
    rqst.post({
      url: 'https://api.travis-ci.org/repo/' + encodeURIComponent(repoName) + '/requests',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Travis-API-Version': '3',
        'Authorization': 'token ' + process.env.TRAVIS_API_TOKEN
      },
      json: true,
      body: {
        message: 'Slack-triggered build by ' + httpRequest.body.user_name,
        branch: branch,
        config: {
          language: 'node_js',
          node_js: '6.0',
          script: 'echo Hello World'
        }
      }
    }, function(error, res, body) {
      if (!error && res.statusCode == 202) {
        httpResponse.send({
          response_type: "in_channel",
          text: "Started build for " + repoName + " on branch " + branch
        });
      }
    });
  } 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

