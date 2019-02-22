import React from 'react';
import { AsyncStorage, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData } = constants;

class Start extends React.Component {
  constructor(props) {
    super(props)
    const needPlayer = this.props.screenProps.localPlayer.id ? true : false
    const needCampaign = this.props.screenProps.localPlayer.campaignId ? true : false
    this.state = {
      localPlayer: this.props.screenProps.localPlayer,
      needPlayer,
      needCampaign,
    }
  }

  componentDidMount = async () => {
    // uncomment this to erase player data from AsyncStorage
    // await storeData('playerInfo', '{}')
  }

  navigate = (route) => {
    const path = this.props.screenProps.path;
    let routeName = route
    let routeParams = {}
    if (path === 'invite') {
      console.log('This player has opened the app via an invitation link, navigating to the AcceptInvite screen.')
      routeName = 'AcceptInvite'
      routeParams = this.props.screenProps.queryParams
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, routeParams })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('=================================')
    console.log('======= componentDidUpdate ======')
    console.log('=================================')
    console.log(this.props.player)
    console.log(this.props.campaign)
    console.log(this.state)
    if (!this.state.ready) {
      if (!this.state.getPlayer && !this.state.getCampaign) {
        this.navigate('About')
      }
      if (this.state.getPlayer && !this.props.player.id) {
        dispatch({ type: c.FETCH_PLAYER, playId: this.state.localPlayer.id})
      }
      if (this.state.getCampaign && !this.props.campaign.id) {
        dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: this.state.localPlayer.campaignId})
      }
    }


    // if (!prevProps.player.id && this.props.player.id && !this.props.player.inActiveGame) {
    //   console.log('This is a returning player who is not currently in a campaign, navigating to About screen')
    //   this.navigate('About')
    // }
    // if (!prevProps.player.id && this.props.campaign.id && this.props.campaign.startDate == null) {
    //   console.log(this.props.player.id)
    //   console.log(this.props.campaign.host)
    //   if (this.props.player.id == this.props.campaign.host) {
    //     console.log('This is the host player registered with this campaign, navigating to CampaignStaging screen')
    //     this.navigate('CampaignStaging')
    //   } else {
    //     console.log('This is a player registered with a game that has not yet started, navigating to WaitForStart screen')
    //     this.navigate('WaitForStart')
    //   }
    // }
    // if (!prevProps.player.id && this.props.campaign.id && this.props.campaign.startDate !== null) {
    //   console.log('This player is in an active game, navigating to ActiveCampaignSummary screen')
    //   this.navigate('ActiveCampaignSummary')
    // }
  }


  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
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
