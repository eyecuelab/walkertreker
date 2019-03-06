import React from 'react';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData } = constants;
import socket from '../socket';
import NavigationService from '../nav/NavigationService';

class SocketIO extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props

    socket.on('connect', () => {
      console.log('================ CONNECTED ================')
      console.log('================     TO    ================')
      console.log('================ SOCKET.IO ================')
      console.log('================   SERVER  ================')
      console.log(`   socket.id: ${socket.id}   `)
      console.log(`   this.props.player.id: ${this.props.player.id}`)
      console.log(`   this.props.player.campaignId: ${this.props.player.campaignId}`)

      // ACTIONS SERVER ==> CLIENT (set up listeners for these):
      // log: log a message from the server in client console
      // sendCampaignInfo: the campaign this player is registered to has updated, we want to update redux store accordingly
      // sendPlayerInfo: the player's info has been updated (likely a server event adjusting hunger or health), want to update state
      // endOfDayUpdate: navigate to end of day summary screen, send push notification
      // campaignStarted: the campaign has started, want to update state, send push notification and navigate to campaign summary screen
      // campaignDeleted: the campaign creator has ended the game, want to blank that slice of state, send a push notification and navigate to the about screen
      // campaignIsLost: the players have lost, navigate to a post mortem screen, send push notification
      // campaignIsWon: the players have survived, navigate to post morten screen, send push notification
      // randomEventStart: a random in-game event has fired, we want to send a push notification and navigate to the appropriate screen
      // randomEventEnd: the event has ended, want to send a push notification

      // ACTIONS CLIENT ==> SERVER (emit these)
      // connectToPlayer, connectToCampaign: establish connection between id on client and id on database

      socket.on('connect_error', (err) => {
        console.log(`Socket connection error: ${err}`)
      })

      socket.on('disconnect', () => {
        console.log("socket disconnected")
      })

      socket.on('log', (msg) => {
        console.log(msg)
      })

      socket.on('sendCampaignInfo', (campaign) => {
        console.log('received sendCampaignInfo event from server')
        dispatch({ type: c.CAMPAIGN_UPDATED, campaign })
      })

      socket.on('sendPlayerInfo', (player) => {
        console.log('received sendPlayerInfo event from server')
        dispatch({ type: c.PLAYER_UPDATED, player })
      })

      socket.on('campaignStarted', (campaign) => {
        console.log('received campaignStarted event from server')
        dispatch({ type: c.CAMPAIGN_UPDATED, campaign })
        NavigationService.navigate('CampaignSummary', { toast: { msg: 'The campaign has begun! Better get moving!' } })
      })

      socket.on('campaignDeleted', (campaign) => {
        console.log('received campaignDeleted event from server')
      })

      socket.on('endOfDayUpdate', (result) => {
        console.log('received endOfDayUpdate event from server')
        NavigationService.navigate('EndOfDaySummary', { update: result })
      })
    })

  }

  componentDidUpdate(prevProps) {
    if (prevProps.player.id == null && this.props.player.id) {
      socket.emit('connectToPlayer', this.props.player.id)
    }

    if (prevProps.player.campaignId == null && this.props.player.campaignId) {
      socket.emit('connectoToCampaign', this.props.player.campaignId)
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
