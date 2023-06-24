const express = require("express");
const app = express();
const fs = require("fs");
//middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (re, res) => {
  res.sendFile(__dirname + "/index.html"); // /VOTINGAPP/index.html
});
app.get("/vote", (req, res) => {
  fs.readFile(__dirname + "/Poll.json", function (err, data) {
    res.send(data);
  });
});
app.post("/vote/new", (req, res) => {
  if (req.body.Maths === "on") {
    choosePolloption(req, res, "Maths");
  } else if (req.body.Physics === "on") {
    choosePolloption(req, res, "Physics");
  } else if (req.body.Chemistry === "on") {
    choosePolloption(req, res, "Chemistry");
  } else {
    res.redirect("?/incorrect_input");
  }
});
function choosePolloption(re, res, option) {
  let poll = {};
  fs.readFile(__dirname + "/Poll.json", "utf8", function (err, data) {
    poll = JSON.parse(data);
    poll[option] += 1;
    fs.writeFile(
      __dirname + "/Poll.json",
      JSON.stringify(poll),
      function (err, data) {
        res.status(200).sendFile(__dirname + "/index.html");
      }
    );
  });
}
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
