var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var onlineUsers = 0;

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.use( express.static( __dirname + '/public' ) );

io.on('connection', function(socket) {

    onlineUsers++;

    socket.on('disconnect', function() {
        onlineUsers--;
    });

});
