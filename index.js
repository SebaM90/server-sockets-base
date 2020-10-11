const path = require('path');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3003);

// static files
app.use( express.static( path.join(__dirname, 'public') ) );

// start server;;
const server = app.listen(app.get('port'), () => {
  console.log("====== SERVER ON PORT", app.get('port'), "=================");
} );

// start Socket
const SocketIO = require('socket.io');
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

