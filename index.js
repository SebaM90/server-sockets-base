const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

// settings
app.set('port', process.env.PORT || 3003);

// static files
app.use( express.static( path.join(__dirname, 'public') ) );


httpServer = new http.Server( app );
io = socketIO( httpServer );

httpServer.listen( app.get('port'), () => {
  console.log("====== SERVER ON PORT", app.get('port'), "=================");
});


// array of clients
let clients = [];

/// webSockets
io.on('connection', (socket) => {

  // save client
  clients.push( `${socket.id} (${socket.request.connection.remoteAddress})` );

  console.log("New user:",socket.id, socket.request.connection.remoteAddress);


  socket.on('disconnect', function() {
      clients.splice(clients.indexOf(socket), 1);
      io.emit('usuarios', clients);
  });

  io.emit('usuarios', clients );

});

