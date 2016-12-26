"use strict";
var express = require('express');
var oauth = require('./lib/oAuth/oauth');
var port = process.env.PORT || 3000;
var app = express();


//Require Routes js
var routesHome = require('./routes/home');

app.use(express.static(__dirname + '/public'));


app.use('/home', routesHome);

app.set('view engine', 'ejs');


app.get('/', function(request, response) {
	oauth.redirectAuthURI(response);
});

app.get('/oauthcallback', function(req, res) {
	oauth.authenticate(req, res, app);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


