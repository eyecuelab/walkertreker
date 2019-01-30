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
      difficultyLevel: 'easy', // options: 'easy', 'hard', 'xtreme'
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

  _updateCampaignLength = async num => {
    let newLength;
    if (num === 0) {newLength = '15'}
    else if (num === 1) {newLength = '30'}
    else if (num === 2) {newLength = '90'}
    await this.setState({campaignLength: newLength});
    console.log(this.state.campaignLength);
  }

  _updateCampaignDifficulty = async num => {
    let newDifficulty;
    if (num === 0) {newDifficulty = 'easy';}
    else if (num === 1) {newDifficulty = 'hard';}
    else if (num === 2) {newDifficulty = 'xtreme';}
    await this.setState({difficultyLevel: newDifficulty});
    console.log(this.state.difficultyLevel);
  }

  _updateRandomEvents = async num => {
    let newEvents;
    if (num === 0) {newEvents = 'low';}
    else if (num === 1) {newEvents = 'mid';}
    else if (num === 2) {newEvents = 'high';}
    await this.setState({randomEvents: newEvents});
    console.log(this.state.randomEvents);
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%',}}
      >
        <View style={styles.container}>
          <Text style={styles.headline}>START A NEW CAMPAIGN</Text>
          <View style={createCampaignStyle.toggleContainer}>
            <ThreeButtonToggle
              title="Number of days"
              subtitle="Number of days for your campaign"
              button1value="15"
              button1label="days"
              button2value="30"
              button2label="days"
              button3value="90"
              button3label="days"
              titleColor="white"
              handleUpdate={this._updateCampaignLength}
            />
          </View>
          <View style={createCampaignStyle.toggleContainer}>
            <ThreeButtonToggle
              title="Difficulty level"
              subtitle="An average distance expected each day"
              button1value="Easy"
              button1label="1 mile"
              button2value="Hard"
              button2label="3 miles"
              button3value="Xtreme"
              button3label="5 miles"
              titleColor="white"
              handleUpdate={this._updateCampaignDifficulty}
            />
          </View>
          <View style={createCampaignStyle.toggleContainer}>
            <ThreeButtonToggle
              title="In-game event"
              subtitle="Frequency for in-game events throughout the day"
              button1value="Low"
              button1label="About 3"
              button2value="Mid"
              button2label="About 5"
              button3value="High"
              button3label="About 8"
              titleColor="white"
              handleUpdate={this._updateRandomEvents}
            />
          </View>
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
const createCampaignStyle = StyleSheet.create({
  toggleContainer: {
    marginTop: 25,
  }
})
