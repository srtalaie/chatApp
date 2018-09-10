const express = require("express");
const PORT = process.env.PORT || 8080
let socket = require("socket.io");

//App setup
let app = express();
let server = app.listen(PORT, function(){
    console.log('Listening to requests on port:', PORT)
});

//Static Files
app.use(express.static('public'));

//Socket setup
let io = socket(server);

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    //Listen for chat message
    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    });

    //Listen for typing
    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data)
    });
});