const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


app.get('/', (req, res)=> {
    res.render('index.ejs');
});


io.sockets.on('connection', function(socket) {

    socket.on('room', (room) =>{

        socket.join(room);
        io.sockets.in(room).emit('group', '<a> You have joined the group  '+ room + '</a>');
     

    socket.on('username', function(username) {
        socket.username = username;
        io.sockets.in(room).emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.sockets.in(room).emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.sockets.in(room).emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

    
});
});


const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});