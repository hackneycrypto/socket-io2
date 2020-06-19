const express = require('express');
const app = express();
const port = 4002;
const http = require('http').createServer();

const gameRooms = ["Rocket League", "Civ 4", "Mario Kart"];

// this is the same socket as on the server
const io = require('socket.io')(http);

// STANDARD EXAMPLE
// // welcome is the event name
io.on('connection', (socket) => {
    socket.emit('welcome', 'hello and welcome - connected');
    socket.emit('welcome', 'hello and welcome 2 - connected');
    socket.emit('welcome', 'hello and welcome 3 - connected');
    console.log(' New Client is connected');

});

// NAMESPACE and ROOMS EXAMPLE (works like an Express Route)
// this is the same socket as on the server
io.of('/games') // io.of is always used to access a namespace
.on('connection', (socket) => {
    socket.emit('welcome', 'Hello and welcome to Games Area'); // Note how we use the specific socket, not io.emit
    // join method used for joining a specific room
    socket.on('joinRoom', (room) => {
        if(gameRooms. includes(room)) {
            socket.join(room);
            io
                .of('/games') // again accessing the specific namespace
                .to(room) // broadcasts to all users but current user (.in broadcasts to all, including current user)
                .emit('newUser', 'New Player has joined: ' + room)
            return socket.emit('success', 'You have joined room: ' + room); // socket.emits only to current user
        } else {
            return socket.emit('err', 'No room named ' + room)
        }
        
        socket.disconnect(); // disconnects the current user (note again socket used, not io)
    })
});
io.of('/news')
.on('connection', (socket) => {
    socket.emit('welcome', 'hello and welcome to News Area');
});



http.listen(port, () => {
    console.log('server is listening on: ' + port);
})

