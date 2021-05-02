const express = require('express');
const path = require("path")
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log("usuario conectado")
  socket.on('chat message', (msg) => {
    console.log(msg)
    io.emit('chat message', msg);
  });
});

module.exports = server
