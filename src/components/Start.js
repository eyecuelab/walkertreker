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
    const { dispatch } = this.props
    // uncomment this to erase player data from AsyncStorage
    // await storeData('playerInfo', JSON.stringify({}))
    let localPlayer = await retrieveData('playerInfo')
    localPlayer = JSON.parse(localPlayer)
    dispatch({ type: c.FETCH_PLAYER, playId: localPlayer.id })
    if (localPlayer.campaignId) {
      dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: localPlayer.campaignId })
    }
  }

  componentDidMount = async () => {
    await this.initializeState();
    const path = this.props.screenProps.path;
    const params = this.props.screenProps.queryParams;
    const player = this.props.player;
    const campaign = this.props.campaign;
    let route = '';
    let routeParams = {};
    if (path === 'invite') {
      route = 'AcceptInvite';
      routeParams = params;
    } else if (player.campaignId) {
      if (campaign.startDate != null) {
        route = 'ActiveCampaignSummary'
      } else {
        route = 'CampaignStaging';
      }
    } else {
      route = 'About';
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route, params: routeParams })]
    });
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
