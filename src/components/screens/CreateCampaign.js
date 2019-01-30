import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { Font } from 'expo';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import ThreeButtonToggle from '../ui/ThreeButtonToggle';

import defaultStyle from '../../styles/defaultStyle';

export default class CreateCampaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // quick placeholder for local state, shouldn't need more than this I think?
      campaignLength: '15', // options: '15', '30', '90'
      difficultyLevel: 'easy', // options: 'easy', 'med', 'hard'
      randomEvents: 'low' // options: 'low', 'mid', 'high'
    }
  }

  _generateCampaign() {
    console.log('All the stuff we need to do will be done here. For now, kick back and relax baby.');
    // TODO
    // 1) generate game UUID
    // 2) get campaign length, difficulty and random events levels from state
    // 3) send gameId, all game parameters, current player to server to create a new campaign
    // 4) send all of the above to redux store
    // 5) navigate to CampaignPartyView screen with path '/newParty:gameId'
    this.props.navigation.navigate('NewCampaignPartyView');
  }

  componentDidMount() {

  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%',}}
      >
        <View style={styles.container}>
          <Text style={styles.headline}>START A NEW CAMPAIGN</Text>
          <ThreeButtonToggle
            titleColor="white"
          />
          <TwoButtonOverlay
            button1title="New Campaign"
            button1onPress={() => this._generateCampaign()}
            button2title="Back"
            button2onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create(defaultStyle);
