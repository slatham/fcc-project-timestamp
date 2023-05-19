// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  res.status(200).json({ unix: Date.now(), utc: new Date().toGMTString() });
});

app.get('/api/:time', (req, res) => {
  const dateString = req.params.time;
  const regexEpochTime = /^[0-9]*$/;

  if (dateString.match(regexEpochTime)) {
    const unixTime = parseInt(dateString);
    const utcTime = new Date(parseInt(dateString)).toGMTString();
    res.status(200).json({ unix: unixTime, utc: utcTime });
  } else if (Date.parse(dateString)) {
    // valid date has been supplied
    const date = new Date(dateString);
    const unixTime = Date.parse(dateString);
    const utcTime = date.toGMTString();
    res.status(200).json({ unix: unixTime, utc: utcTime });
  } else {
    res.status(500).json({ error: 'Invalid Date' });
  }
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
