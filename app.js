var
    express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    clientList = [],
    socketId;

http.listen( 3000 );

app.use( express.static( __dirname + '/public' ) );

io.on('connection', function(socket) {

    if ( socket.handshake.query.type == "admin" ) {

        console.log("Admin Here");

        socket.on('call-get-data', function () {
            io.sockets.emit('set-data', { clientList });
        });

    } else {

        socket.on('disconnect', function () {

            socketId = getSocketId( socket );

            for ( let i = 0; i < clientList.length; i++ )
                if ( clientList[i].id === socketId )
                    clientList.splice(i, 1);

        });

        socket.on('submit-data', function( data ) {

            clientList.push({
                "id":       getSocketId( socket ),
                "title":    data.pageTitle,
                "url":      socket.request.headers.referer,
                "referrer": data.pageReferrer,
                "time":     Math.floor(new Date() / 1000),
            });

        });

        socketId = getSocketId( socket );

        if ( !getSocketIdFromCookie( socket ) ) {
            if (socketId !== socket.id)
                io.sockets.emit('set-cookie', socketId);
        }

    }

});

let
    getSocketId = function( socket ) {

        if ( getSocketIdFromCookie( socket ) )
            return getSocketIdFromCookie( socket );
        else
            return socket.id;

    },
    getSocketIdFromCookie = function( socket ) {

        if ( typeof socket.handshake.query.socket_cookie !== "undefined" && socket.handshake.query.socket_cookie !== "null" && socket.handshake.query.socket_cookie.length > 0 )
            return socket.handshake.query.socket_cookie;

    };