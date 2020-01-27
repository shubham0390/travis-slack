var rqst = require("request");
var bodyParser = require("body-parser");

module.exports.buildAndroid = function buidlAndroid(commands, httpRequest) {
  var branch = "development";
  if (commands >= 1) {
    branch = commands[1];
    console.log("Executing with branch" + branch);
  } else {
    console.log("Executing with default branch");
  }

  var appName = "appName:Mindtickleapp";
  if (commands >= 2) {
    appName = commands[2];
    console.log("Executing with app" + appName);
  } else {
    console.log("Executing with default app");
  }

  var distribution = "distribution:firebase";
  if (commands >= 3) {
    distribution = commands[3];
    console.log("Executing with distribution" + distribution);
  } else {
    console.log("Executing with default distribution");
  }

  var enableDriveUpload = "enableDriveUpload:false";
  if (commands >= 4) {
    enableDriveUpload = commands[4];
    console.log("Executing with enableDriveUpload" + enableDriveUpload);
  } else {
    console.log("Executing with default drive upload");
  }

  console.log("Executing final request");
  rqst.post(
    {
      url:
        "https://api.travis-ci.org/repo/" +
        encodeURIComponent("sage") +
        "/requests",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Travis-API-Version": "3",
        Authorization: "token " + "3JErSyzRokBRfwTT4NrgrQ"
      },
      json: true,
      body: {
        message: "build by " + httpRequest.body.user_name,
        branch: branch,
        config: {
          script:
            "bundle exec fastlane deployMindTickle" +
            appName +
            distribution +
            enableDriveUpload
        }
      }
    },
    function(error, res, body) {
      if (!error && res.statusCode == 202) {
        httpResponse.send({
          response_type: "in_channel",
          text: "Started build for " + repoName + " on branch " + branch
        });
      }
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );

  response.addListener();
};

module.exports.buildIos = function buildIos(commands, httpRequest) {};
