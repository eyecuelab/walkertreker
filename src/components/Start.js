import React from 'react';
import { AsyncStorage, ImageBackground } from 'react-native';
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import constants from '../constants';
const { c, retrieveData, storeData, navigation } = constants;

class Start extends React.Component {
  constructor(props) {
    super(props)
    const localPlayer = this.props.screenProps.localPlayer
    const notification = this.props.screenProps.notification
    const needPlayer = localPlayer.id ? true : false
    const needCampaign = localPlayer.campaignId ? true : false
    this.state = {
      localPlayer,
      needPlayer,
      needCampaign,
      notification,
      gotPlayer: false,
      gotCampaign: false,
    }
  }

  

  componentDidMount = async () => {
    console.log('Start - component did mount')
    const { dispatch } = this.props

    if (this.state.needPlayer) {
      dispatch({ type: c.FETCH_PLAYER, playId: this.state.localPlayer.id})
    }
    if (this.state.needCampaign) {
      dispatch({ type: c.FETCH_CAMPAIGN_INFO, id: this.state.localPlayer.campaignId})
    }
    console.log("screenprops", this.props.screenProps.queryParams.playerId)
    if (this.props.screenProps.queryParams.playerId) {
      dispatch({ type: c.FETCH_PLAYER, playId: this.props.screenProps.queryParams.playerId})
    }
    if (!this.state.needPlayer) {

      //if no localPlayer.id, user enters a phone number
      //if phone number is in database, needPlayer=true
      //if phone number not in database, create a new player

      this.navigate('About')
    }
  }

  navigate = (route) => {
    const path = this.props.screenProps.path;
    console.log(path);
    let routeName = route
    let routeParams = {}
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params: routeParams })]
    });
    if (this.state.notification) {
      const type = this.state.notification.data.type
      if (navigation[type] !== 'none') {
        routeName = navigation[type]
      }
      routeParams = this.state.notification.data.data ? { data: this.state.notification.data.data } : {}
    }
    if (path === 'invite') {
      routeName = 'AcceptInvite'
      routeParams = {
        campaignId: this.props.screenProps.queryParams.campaignId,
      }
    }
    if (path === 'recovery') {
      routeName = 'RecoverAccount'
      routeParams = {
        playerId: this.props.screenProps.queryParams.playerId,
      }
    }
    console.log('INITIAL NAVIGATION: ')
    console.log('routeName: ', routeName)
    console.log('routeParams: ', routeParams)
    this.props.navigation.dispatch(resetAction);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('here i am in start')
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
        source={require('../../assets/splash2.png')}
        style={{width: '100%', height: '100%'}}
      >
        <NavigationEvents
      onWillFocus={payload => console.log('will focus',payload)}
      onDidFocus={payload => console.log('did focus',payload)}
      onWillBlur={payload => console.log('will blur',payload)}
      onDidBlur={payload => console.log('did blur',payload)}
    />
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
