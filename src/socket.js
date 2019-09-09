import io from "socket.io-client";
import { FRONT_END_ENDPOINT } from "react-native-dotenv";

// configuring socket.io
// local
// to connect to local server, 1) start the server 2) get local ip address 3) update const endpoint to point at that ip address at port 5000

const endpoint = FRONT_END_ENDPOINT;

const socket = io(endpoint, {
  transports: ["websocket"]
});

module.exports = socket;

// LOCAL eyecue endpoint KIM:
// const endpoint = 'http://localhost:5000/'

// LOCAL eyecue endpoint WARD
// const endpoint = 'http://192.168.0.104:5000/';

// kim's home ip:
// const endpoint = 'http://192.168.1.5:5000'

// Ward' home ip:
// const endpoint = 'http://10.0.0.5:5000';

// LOCAL eyecue endpoint MacBook Air
// const endpoint = "http://10.1.10.17:5000";

// Brooke's home ip:
// const endpoint = "http://192.168.0.11:5000";

// remote:
// const endpoint = "https://walkertrekker.herokuapp.com";
