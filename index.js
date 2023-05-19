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
  // regex for date in UTC format
  const regexDate = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
  const regexTime = /^[0-9]*$/;

  // check what the format of the param for time is
  if (dateString.match(regexDate)) {
    // been supplied yyyy-mm-dd

    // get the unix time from the date param
    const unixDate = Date.parse(dateString);

    // get the UTC date from unixDate
    const utcDate = new Date(unixDate);

    res.status(200).json({ unix: unixDate, utc: utcDate.toGMTString() });
  } else if (dateString.match(regexTime)) {
    const utcDate = new Date(parseInt(dateString));
    res
      .status(200)
      .json({ unix: parseInt(dateString), utc: utcDate.toGMTString() });
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
