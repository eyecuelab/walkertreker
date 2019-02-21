import React from 'react'
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData } = constants;
import io from 'socket.io-client';

class SocketIO extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // local
    // const endpoint = 'http://192.168.0.102:5000'
    // remote
    const endpoint = 'walkertrekker.herokuapp.com'
    const socket = io(endpoint, {
      transports: ['websocket']
    })

    socket.on('connect', () => {
      console.log('================ CONNECTED ================')
      console.log('================     TO    ================')
      console.log('================ SOCKET.IO ================')
      console.log('================   SERVER  ================')
    })
    socket.on('connect_error', (err) => {
      console.log(err)
    })
    socket.on('disconnect', () => {
      console.log("socket disconnected")
    })
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(SocketIO)
