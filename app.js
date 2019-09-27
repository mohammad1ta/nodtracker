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
        console.log('a user disconnect');
        onlineUsers--;
    });

    socket.on('web-listener', function( title ) {
        console.log( "Title: " + title );
    });

    socket.on('web-title', function( title ) {
        console.log( "Title: " + title );
    });

    socket.on('web-referrer', function( referrer ) {
        console.log( "Referrer: " + referrer )
    });

    socket.on('show-online', function( a ) {
        console.log( "Onlines: " + onlineUsers )
    });

});
