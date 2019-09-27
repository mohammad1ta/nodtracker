// var io = io();
var socket = io( 'http://nolatic.mokhafaf.com:3000', { reconnect: true } );

socket.on('connect', function () {
});

socket.emit( 'web-referrer', document.referrer );
socket.emit( 'web-title', document.title );
socket.emit( 'show-online', 1 );
