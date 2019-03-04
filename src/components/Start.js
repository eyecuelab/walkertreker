import React from 'react';
import { AsyncStorage, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData } = constants;

class Start extends React.Component {
  constructor(props) {
    super(props)
    let localPlayer;
    if (this.props.screenProps.localPlayer) {
      localPlayer = JSON.parse(this.props.screenProps.localPlayer);
    } else {
      localPlayer = {};
    }
    const needPlayer = localPlayer.id ? true : false
    const needCampaign = localPlayer.campaignId ? true : false
    this.state = {
      localPlayer,
      needPlayer,
      needCampaign,
      gotPlayer: false,
      gotCampaign: false,
    }
  }

  componentDidMount = async () => {
    const { dispatch } = this.props
    // uncomment this to erase player data from AsyncStorage
    // await storeData('playerInfo', '{}')
    if (this.state.needPlayer) {
      dispatch({ type: c.FETCH_PLAYER, playId: this.state.localPlayer.id})
    }
    if (this.state.needCampaign) {
      dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: this.state.localPlayer.campaignId})
    }
  }

  navigate = (route) => {
    const path = this.props.screenProps.path;
    let routeName = route
    let routeParams = {}
    if (path === 'invite') {
      routeName = 'AcceptInvite'
      routeParams = {
        campaignId: this.props.screenProps.queryParams.campaignId,
      }
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params: routeParams })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.player.id == null && this.props.player.id !== null) {
      this.setState({ gotPlayer: true })
    }
    if (prevProps.campaign.id == null && this.props.campaign.id !== null) {
      this.setState({ gotCampaign: true })
    }
    if (this.state.needPlayer == this.state.gotPlayer && this.state.needCampaign == this.state.gotCampaign) {
      if (this.state.needCampaign) {
        if (this.props.campaign.startDate !== null) {
          // player is in an active game, navigate to campaign summary screen
          this.navigate('CampaignSummary')
        } else if (this.props.player.id == this.props.campaign.host) {
          // player created campaign that has not started, navigate to campaign staging
          this.navigate('CampaignStaging')
        } else {
          // player has joined a campaign that has not started, navigate to wait for start
          this.navigate('WaitForStart')
        }
      } else {
        // not registered with a campaign, if invited will navigate to Accept Invite, otherwise navigate to About
        this.navigate('About')
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/splash.png')}
        style={{width: '100%', height: '100%'}}
      >
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(Start);
