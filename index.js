var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var config = require('./lib/config');
var path = require('path');
var async;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/speedtest');
var speedSchema = mongoose.Schema({
    date: Date,
    ping: Number,
    down: Number,
    up: Number
});

var Speed = mongoose.model('speed', speedSchema);

var json = function(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

  if(typeof data === "string") res.write(data);

  else res.write(JSON.stringify(data));

  res.end();
};
app.use(express.static(__dirname + '/static'));

app.get('/speeds', function(req, res) {
  var values;
  Speed.find(function (err, speeds) {
        if (err) return console.error(err);
          console.log(speeds);
          json(res, speeds);
  })
});

server.listen(process.env.PORT || config.port);
