import React from 'react';
import { AsyncStorage, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData } = constants;

class Start extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  initializeState = async () => {
    // uncomment this to erase player data from AsyncStorage
    // await storeData('playerInfo', JSON.stringify({}))
    // let localPlayer = await retrieveData('playerInfo')
    // localPlayer = JSON.parse(localPlayer)
    // console.log('localPlayer: ', localPlayer)
  }

  componentDidMount = async () => {
    await this.initializeState()
    const path = this.props.screenProps.path;
    const params = this.props.screenProps.queryParams;
    const player = this.props.player;
    const campaign = this.props.campaign;
    console.log('============CONFIGURING INITIAL NAVIGATION============');
    console.log('Logging state:')
    console.log('player: ', player);
    console.log('campaign: ', campaign);
    let route = '';
    let routeParams = {};
    if (path === 'invite') {
      console.log('User was invited to a game, navigating to Accept Invite screen')
      route = 'AcceptInvite';
      routeParams = params;
    } else if (player.campaignId) {
      // if player is in active game (campaign.campaignId == true && campaign.startDate == true) set
      // console.log('Player is in an active game, navigating to Active Campaign screen.')
      // route = "ActiveCampaignSummary"

      // else set
      console.log('Player is registered in an active game, navigating to Campaign Staging screen.')
      route = 'CampaignStaging';
    } else {
      console.log('User is not in an active game nor was invited to a new game, navigating to About screen.')
      route = 'About';
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route, params: routeParams })]
    });
    console.log('============EXECUTING INITIAL NAVIGATION ACTION============');
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
      </ImageBackground>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(Start);
