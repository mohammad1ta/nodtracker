var
    express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    onlineUsersCount = 0,
    clientList = [],
    pageTitle = "",
    pageReferrer = "",
    pageUrl = "";

http.listen(3000, function(){ console.log('listening on *:3000'); });

app.use( express.static( __dirname + '/public' ) );

io.on('connection', function(socket) {

    pageUrl = socket.request.headers.referer;

    onlineUsersCount++;

    socket.on('disconnect', function() {

        onlineUsersCount--;

        for( var i = 0; i < clientList.length; i++ ) {

            if ( clientList[i].id == socket.id ) {
                clientList.splice( i, 1 );
            }

        }

    });

    socket.on('submit-data', function() {

        clientList.push(
            {
                "id": socket.id,
                "title": pageTitle,
                "url": pageUrl,
                "referrer": pageReferrer,
                "time": Math.floor(new Date() / 1000),
            }
        );

    });

    socket.on('set-web-title', function( title ) { pageTitle = title });
    socket.on('set-web-referrer', function( referrer ) { pageReferrer = referrer });
    socket.on('call-get-data', function() { io.sockets.emit( 'set-data', { onlineUsersCount, clientList } ); });

});
