import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';
import WaitForStart from './WaitForStart';
import CampaignStaging from './CampaignStaging';

class Lobby extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { player, campaign: { host }, navigation } = this.props;
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
      
      {player.id === host ? <CampaignStaging navigation={navigation}/> : <WaitForStart navigation={navigation}/>}
      
      </ImageBackground>
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
