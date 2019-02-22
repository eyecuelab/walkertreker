import React from 'react';
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData } = constants;
import socket from '../socket';
import NavigationService from '../nav/NavigationService';

class SocketIO extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props

    socket.on('connect', () => {
      console.log('================ CONNECTED ================')
      console.log('================     TO    ================')
      console.log('================ SOCKET.IO ================')
      console.log('================   SERVER  ================')
      // NavigationService.navigate('About');
    })

    socket.on('connect_error', (err) => {
      console.log(err)
    })

    socket.on('disconnect', () => {
      console.log("socket disconnected")
    })

    socket.on('log', (msg) => {
      console.log(msg)
    })

    // ACTIONS SERVER ==> CLIENT (set up listeners for these):
    // sendCampaignInfo: the campaign this player is registered to has updated, we want to update redux store accordingly
    // campaignDeleted: the campaign creator has ended the game, want to blank that slice of state, send a push notification and navigate to the about screen
    // campaignStarted: the campaign has started, want to update state, send push notification and navigate to campaign summary screen
    // sendPlayerInfo: the player's info has been updated (likely a server event adjusting hunger or health), want to update state
    // camapignEventStarted: a random in-game event has fired, we want to send a push notification and navigate to the appropriate screen
    // campaignEventEnded: the event has ended, want to send a push notification

    // ACTIONS CLIENT ==> SERVER (emit these)
    // connectToPlayer, connectToCampaign: establish connection between id on client and id on database
    //

    socket.on('sendCampaignInfo', (campaign) => {
      console.log('received sendCampaignInfo event from server')
      dispatch({ type: c.CAMPAIGN_UPDATED, campaign })
    })

    socket.on('sendPlayerInfo', (player) => {
      console.log('received sendPlayerInfo event from server')
      dispatch({ type: c.PLAYER_UPDATED, player })
    })
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevProps == null && this.props.player.id) {
      console.log(`sending action connectToPlayer to server with id ${this.props.player.id}`)
      socket.emit('connectToPlayer', this.props.player.id)
    }
    if (prevProps == null && this.props.player.campaignId) {
      console.log(`sending action connectToCampaign to server with id ${this.props.player.campaignId}`)
      socket.emit('connectToCampaign', this.props.player.campaignId)
    }
  }

  componentWillUnmount() {
    socket.disconnect()
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
