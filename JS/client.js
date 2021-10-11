const socket = io('http://localhost:8000')

// get DOM Elements in a JS variable

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer= document.querySelector('.container')

// Audio that plays on recieving messages

let audio = new Audio('Message notification.mp3')

/// Function that appends event info to the container

const append= (message , position)=>{
    const messageElement= document.createElement('div')
    messageElement.innerText= message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position=='left'){
    audio.play();
    }
}

// Send message to the server when form submits.
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`you:${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = " ";
})

// Ask new user for his name and let the server know.

const name = prompt('Enter your name to join -')
socket.emit('new-user-joined' , name)

// If a new user joins , recieve his name from the server.
socket.on('user-joined',(name)=>{
    append(`${name} joined the chat`,'right')   
})

// Recieving the message from the server.
socket.on('recieve',(data)=>{
    append(`${data.name}:${data.message}`,'left')
})

// If a user leaves the chat then let everyone know.
socket.on('left',(name)=>{
    append(`${name}:left the chat`,'right')
})
