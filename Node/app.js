// require('@google-cloud/trace-agent').start();

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB setup

app.use(require('./api/profile'));

app.get('/ping', function(req, res){
  res.send("Hello");
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
