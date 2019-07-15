import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';
import WaitForStart from './WaitForStart';
import CampaignStaging from './CampaignStaging';
import { StackActions, NavigationActions } from 'react-navigation';




class Lobby extends Component {
  constructor(props) {
    super(props);
    this.navigate();
  }

  navigate(route) {
    const { player, campaign: { host }, navigation } = this.props;
    LobbyScreen = player.id === host ? "CampaignStaging" : "WaitForStart";

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: LobbyScreen })],
    });
    navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Text>SPLASH</Text>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player : state.player,
    campaign : state.campaign
  }
}


export default connect(mapStateToProps)(Lobby);
