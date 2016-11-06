var fs = require('fs');
var https = require('https');
var app = require('express')();
var options = {
   key  : fs.readFileSync('/etc/letsencrypt/archive/app.madziar.com/privkey1.pem'),
   cert : fs.readFileSync('/etc/letsencrypt/archive/app.madziar.com/cert1.pem')
};

app.get('/', function (req, res) {
   res.send('Hello World!');
});

https.createServer(options, app).listen(443, function () {
   console.log('Started!');
});
