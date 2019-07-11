import io from 'socket.io-client';

// configuring socket.io
// local
// to connect to local server, 1) start the server 2) get local ip address 3) update const endpoint to point at that ip address at port 5000

// eyecue:
const endpoint = 'http://10.1.10.51:5000'

// kim's home ip:
// const endpoint = 'http://192.168.1.5:5000'

// kim's coffeshop ip:
// const endpoint = 'http://172.16.103.172:5000'

// Ward' home ip:
// const endpoint = 'http://10.0.0.5:5000'

// remote:
// const endpoint = 'walkertrekker.herokuapp.com'

const socket = io(endpoint, {
  transports: ['websocket']
})

module.exports = socket
