// var io = io();
var socket = io( 'http://nolatic.mokhafaf.com:3000', { reconnect: true } );

socket.on('connect', function () {
  // console.log('Tracker Connected');
  // console.log(socket.id);
});

socket.emit( 'set-web-referrer', document.referrer );
socket.emit( 'set-web-title', document.title );
socket.emit( 'submit-data' );

