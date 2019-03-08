import React from 'react';
import { Permissions, Notifications } from 'expo';
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData } = constants;
import socket from '../socket';
import NavigationService from '../nav/NavigationService';

class SocketIO extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    const { dispatch } = this.props

    socket.on('connect_error', (err) => {
      console.log(`Socket connection error: ${err}`)
    })

    socket.on('log', (msg) => {
      console.log(msg)
    })

    socket.on('connect', async () => {
      console.log('================ CONNECTED ================')
      console.log('================     TO    ================')
      console.log('================ SOCKET.IO ================')
      console.log('================   SERVER  ================')
      console.log(`   socket.id: ${socket.id}   `)
    })

    socket.on('disconnect', () => {
      console.log("socket disconnected, attempting reconnect")
      socket.open()
    })

    socket.on('sendCampaignInfo', (campaign) => {
      console.log('received sendCampaignInfo event from server')
      dispatch({ type: c.CAMPAIGN_UPDATED, campaign })
    })

    socket.on('sendPlayerInfo', (player) => {
      console.log('received sendPlayerInfo event from server')
      dispatch({ type: c.PLAYER_UPDATED, player })
    })

    const token = await this.getPushToken()
    socket.emit('log', '')
    socket.emit('log', ' ========================= ')
    socket.emit('log', '')
    socket.emit('log', `   YOUR NOTIFICATION TOKEN: ${token}   `)
    socket.emit('log', '')
    socket.emit('log', ' ========================= ')
    socket.emit('log', '')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.player.id == null && this.props.player.id) {
      socket.emit('connectToPlayer', this.props.player.id)
    }
    if (prevProps.player.campaignId == null && this.props.player.campaignId) {
      socket.emit('connectToCampaign', this.props.player.campaignId)
    }
  }

  getPushToken = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('TOKEN: ', token)
    return token;
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
