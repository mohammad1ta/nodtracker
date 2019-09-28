var socket = io( 'http://nolatic.mokhafaf.com:3000', { reconnect: true } ),
    d = document,
    elemOnlineUsers = d.querySelector( ".nodtracker-onlines span" ),
    elemUserList = d.querySelector( ".nodtracker-user-list" );
// var mouseElem = document.getElementById( "mouse" );
// var pageWrapper = document.getElementById( "page-wrapper" );
// var pageFrame = document.getElementById( "page-frame" );

socket.on('connect', function () {
  // console.log('Mouse Connected');
});

var getOnlineUsers = function() {
    socket.emit( 'call-get-data' );
},

updateData = function ( onlineUsers, clientList ) {

    elemOnlineUsers.innerHTML = clientList.length;

    elemUserList.innerHTML = "";

    for( var i = 0; i < clientList.length; i++ ) {

        var timeDiff = timeDifference( Math.floor(new Date() / 1000), clientList[i].time );

        elemUserList.innerHTML += "" +
            "<li>" +
                "کاربر " + i +
                "<span class='nodtracker-page-title'>" + clientList[i].title + "</span>" +
                "<span class='nodtracker-time'>" + timeDiff + "</span>" +
            "</li>";

    }

};


socket.on('set-data', function (data) {
    updateData( data.onlineUsersCount, data.clientList );
});

socket.on('get-client-list', function( clientList ) {
  console.log(clientList);
});

getOnlineUsers();

setInterval(function() {

    getOnlineUsers();

}, 5000);



var timeDifference = function(current, previous) {

    var msPerMinute = 60;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' ثانیه پیش';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' دقیقه پیش';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' ساعت پیش';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' روز پیش';
    }

};




// Actions
//
// socket.on('result-move', function ( result ) {
//     mouseElem.style.top = ( result.mouse.y ) + "px";
//     mouseElem.style.left = ( result.mouse.x ) + "px";
// });
//
// socket.on('result-click', function ( result ) {
//
//     document.elementFromPoint( result.mouse.x, result.mouse.y ).click();
//
//     // if ( result.mouse.src )
//     //   pageFrame.src = result.mouse.src;
//
// });
//
// socket.on( 'result-scroll', function ( result ) {
//
//     window.scrollTo(0, result);
//
//     var w = window,
//         d = document,
//         e = d.documentElement,
//         g = d.getElementsByTagName('body')[0];
//
//     var pageHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
//
//     pageFrame.height = pageHeight + result;
//     pageWrapper.style.height = pageHeight + result + "px";
//
// });
//
// socket.on('result-resize', function ( result ) {
//
//     pageWrapper.style.width = result.x + "px";
//     pageWrapper.style.height = result.y + "px";
//
//     pageFrame.width = result.x;
//     pageFrame.height = result.y;
//
// });
