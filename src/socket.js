import io from 'socket.io-client';

// configuring socket.io
// local
// to connect to local server, 1) start the server 2) get local ip address 3) update const endpoint to point at that ip address at port 5000
const endpoint = 'http://192.168.1.5:5000'
// remote
// const endpoint = 'walkertrekker.herokuapp.com'
const socket = io(endpoint, {
  transports: ['websocket']
})

module.exports = socket
