// Node server which will handle socket.io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
});


const users = {};

// if a new user joins let other connected users know about it.

io.on('connection', (socket)=>{
    socket.on('new-user-joined', (name)=>{
       /*  console.log('hello' ,name) */
        users[socket.id]= name;
        socket.broadcast.emit('user-joined',name);
    });

// if someone sends a message broadcast it to other people.

    socket.on('send', (message)=>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]});
    });

// if someone disconnects then let others know about it. 
    
    socket.on('disconnect',(message)=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })
})
