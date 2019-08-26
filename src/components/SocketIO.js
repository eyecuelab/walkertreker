import React from 'react';
import { Permissions, Notifications } from 'expo';
import { connect } from 'react-redux';
import constants from '../constants';
const { c } = constants;
import socket from '../socket';
import NavigationService from '../nav/NavigationService';

class SocketIO extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    const { dispatch } = this.props
  
    if (this.props.player.id) {
      socket.emit('connectToPlayer', this.props.player.id);
    }

    if (this.props.campaign.id) {
      socket.emit('connectToCampaign', this.props.player.campaignId);
    }

    socket.on('connect_error', (err) => {
      console.log(`Socket connection error: ${err}`)
    })

    socket.on('log', (msg) => {
      console.log("socket msg", msg)
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
      console.log('++++ received sendCampaignInfo event from server ++++++' + campaign)
      dispatch({ type: c.CAMPAIGN_UPDATED, campaign })
    })

    socket.on('sendPlayerInfo', (player) => {
      console.log("++++SendPlayerInfo+++++" + JSON.stringify(player));
      dispatch({ type: c.PLAYER_UPDATED, player })
    })

    setInterval(() => {
      socket.emit('stayAwake');
    }, 5000)
    socket.on('stayAwake', () => {return;})
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.player.id && this.props.player.id) {
      console.log("attempting to connect player to SocketIO")
      socket.emit('connectToPlayer', this.props.player.id)
    }
    if (prevProps.player.campaignId == null && this.props.player.campaignId) {
      socket.emit('connectToCampaign', this.props.player.campaignId)
    }
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
