const io = require('socket.io-client');

// this socket object as on the server
let socket = io.connect('http://localhost:4002');
let games = io.connect('http://localhost:4002/games');
let news = io.connect('http://localhost:4002/news');

// STANDARD EXAMPLE
// needs to match the event name on the server
// any data could be sent
socket.on('welcome', (msg) => {
    console.log('received: ', msg);
});

// // NAMESPACE EXAMPLE
// games.on('welcome', (msg) => {
//     console.log('Received: ', msg);
// });
// // news.on('welcome', (msg) => {
// //     console.log('received: ', msg);
// // });
// // These new listeners added for the rooms...
// games.emit('joinRoom', 'Rocket League');
// games.on('newUser', (res) => console.log(res));
// games.on('err', (err) => console.log(err));
// games.on('success', (res) => console.log(res));
