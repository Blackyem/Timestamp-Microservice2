// index.js
// where your node app starts
// init project
var express = require('express');
const dotenv = require("dotenv");

var app = express();

dotenv.config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionsSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:timestamp", (req, res) => {
  let timestamp = req.params.timestamp;
  if (timestamp.match(/\d{5,}/)) {
    timestamp = +timestamp;
  }
  const date = new Date(timestamp);
  if (date.toUTCString() == "Invalid Date") {
    res.json({
      error: date.toUTCString()
    })
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
});
app.get("/api/timestamp", (req, res) => {
  let date = new Date()
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});