var express = require('express');
var path = require('path');
var app = express();

var fs = require('fs');
var https = require('https');

var options = {
   key  : fs.readFileSync('/etc/letsencrypt/archive/app.madziar.com/privkey1.pem'),
   cert : fs.readFileSync('/etc/letsencrypt/archive/app.madziar.com/fullchain1.pem')

};

app.use(express.static(path.join(__dirname, 'dist')));

https.createServer(options, app).listen(443, function () {
   console.log('Started!');
});

