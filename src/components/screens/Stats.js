import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import ScreenContainer from './../containers/ScreenContainer';
import CampaignHeader from './../ui/CampaignHeader';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
        <ScreenContainer>
        
        <CampaignHeader title="Total Stats"/>
          
          
        </ScreenContainer>
      </ImageBackground>
    );
  }
}

export default Stats;
