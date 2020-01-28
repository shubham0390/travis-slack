var express = require("express");
var bodyParser = require("body-parser");
var rqst = require("request");
var app = express();
var helper = require("./BuildHelper");

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(request, response) {
  response.send("Hello World");
});

app.post("/slack-request", function(httpRequest, httpResponse) {
  if (httpRequest.body.text) {
    var commandText = httpRequest.body.text;
    console.log("text", httpRequest.body.text);
    var commands = commandText.split(" ");
    console.log("command Array ", commands);
    var repository = "android";

    if (commands.length >= 1) {
      repository = commands[0];
      console.log("Executing with repository" + repository);
    } else {
      console.log("Executing with default repository");
    }

    console.log("Final repository" + repository);
    if (repository == "android") {
      console.log("Executing android build");
      helper.buildAndroid(commands, httpRequest,httpResponse);
    } else if (repository == "") {
      console.log("Executing ios build");
      helper.buildIos(commands, httpRequest,httpResponse);
    } else {
      // Send build failed message
    }
  }
});

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
