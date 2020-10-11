const path = require('path');
const express = require('express');
const SocketIO = require('socket.io');
const app = express();
const http = require('http');

// settings
app.set('port', process.env.PORT || 3003);

// static files
app.use( express.static( path.join(__dirname, 'public') ) );

// start server;;
const server = http.createServer(app).listen(app.get('port'), () => {
  console.log("====== SERVER ON PORT", app.get('port'), "=================");
} );

// start Socket
const io = SocketIO(server);

// array of clients
let clients = [];

/// webSockets
io.on('connection', (socket) => {

  // save client
  clients.push(socket.id);

  console.log("New user:",socket.id);

  socket.on('disconnect', function() {
      clients.splice(clients.indexOf(socket), 1);
      io.emit('usuarios', clients);
  });

  io.emit('usuarios', clients );

});

