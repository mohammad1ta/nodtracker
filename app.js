var express = require('express');
var app = express();
var http = require('http').createServer(app);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
