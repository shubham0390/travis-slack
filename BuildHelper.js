var rqst = require("request");
var bodyParser = require("body-parser");

module.exports.buildAndroid = function buidlAndroid(commands) {
  var branch = "development";
  if (commands >= 2) {
    branch = commands[2];
    console.log("Executing with branch" + branch);
  } else {
    console.log("Executing with default branch");
  }

  var appName = "appName:Mindtickleapp";
  if (commands >= 3) {
    appName = commands[3];
    console.log("Executing with app" + appName);
  } else {
    console.log("Executing with default app");
  }

  var distribution = "distribution:firebase";
  if (commands >= 4) {
    distribution = commands[4];
    console.log("Executing with distribution" + distribution);
  } else {
    console.log("Executing with default distribution");
  }

  var enableDriveUpload = "enableDriveUpload:false";
  if (commands >= 5) {
    enableDriveUpload = commands[5];
    console.log("Executing with enableDriveUpload" + enableDriveUpload);
  } else {
    console.log("Executing with default drive upload");
  }

  console.log("Executing final request")
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
    }
  );
};

module.exports.buildIos = function buildIos(commands) {};