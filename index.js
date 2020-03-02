var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.emit('some event', {
    someProperty: 'Hola',
    otherProperty: 'Usuario'
}); // This will emit the event to all connected sockets

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('customEmit', function (msg) {
        console.log('channel custom emit', msg);
        io.emit('customEmit', 'Hola hemos recibido tu mensaje desde custom emit: ' + msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat_message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat_message', 'Hola hemos recibido tu mensaje: ' + msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});