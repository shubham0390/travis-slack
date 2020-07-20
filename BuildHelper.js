var rqst = require("request");
var bodyParser = require("body-parser");

module.exports.buildAndroid = function buidlAndroid(commands, httpRequest,httpResponse) {
  console.log("Recieved command " + commands);
  var branch = "development";
  if (commands >= 1) {
    branch = commands[1];
    console.log("Executing with branch " + branch);
  } else {
    console.log("Executing with default branch " + branch);
  }

  var appName = "appName:Mindtickleapp";
  if (commands >= 2) {
    appName = commands[2];
    console.log("Executing with app " + appName);
  } else {
    console.log("Executing with default app " +appName);
  }

  var distribution = "distribution:firebase";
  if (commands >= 3) {
    distribution = commands[3];
    console.log("Executing with distribution " + distribution);
  } else {
    console.log("Executing with default distribution " + distribution);
  }

  var enableDriveUpload = "enableDriveUpload:false";
  if (commands >= 4) {
    enableDriveUpload = commands[4];
    console.log("Executing with enableDriveUpload " + enableDriveUpload);
  } else {
    console.log("Executing with default drive upload "+ enableDriveUpload);
  }

  var learningSite = ""
  if (commands >= 5) {
    enableDriveUpload = commands[5];
    console.log("Executing with learningsite " + enableDriveUpload);
  } else {
    console.log("Executing with default learning site" + enableDriveUpload);
  }

  console.log("Executing final request " + appName + " " + branch + " " + distribution+ " " + enableDriveUpload + " " + learningSite);
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
            enableDriveUpload +
            learningSite
        }
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 202) {
        httpResponse.send({
          response_type: "in_channel",
          text: "Started build for " + repoName + " on branch " + branch
        });
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the HTML for the Google homepage.
      }else{
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      }
    }
  );
};

module.exports.buildIos = function buildIos(commands, httpRequest,httpResponse) {
  var branch = "development";
  if (commands >= 1) {
    branch = commands[1];
    console.log("Executing with branch" + branch);
  } else {
    console.log("Executing with default branch");
  }

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
    function(error, response, body) {
      if (!error && response.statusCode == 202) {
        httpResponse.send({
          response_type: "in_channel",
          text: "Started build for " + repoName + " on branch " + branch
        });
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the HTML for the Google homepage.
      }else{
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      }
    }
  );

};
