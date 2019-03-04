import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, AsyncStorage } from 'react-native';
import { v4 } from 'uuid';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import ThreeButtonToggle from '../ui/ThreeButtonToggle';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c, retrieveData } = constants;

class CreateCampaign extends React.Component {

  constructor(props) {
    super(props);
  }

  async _generateCampaign() {
    const { dispatch } = this.props;
    const now = new Date();
    const timezone = -now.getTimezoneOffset()/60;
    let apiPayload = {
      "params": {
        "campaignLength": this.props.campaign.length,
        "difficultyLevel": this.props.campaign.difficultyLevel,
        "randomEvents": this.props.campaign.randomEvents,
      },
      "playerId": this.props.player.id,
      "timezone": timezone
    }

    apiPayload = JSON.parse(JSON.stringify(apiPayload));
    dispatch({type: c.SET_INITIAL_CAMPAIGN_DETAILS, payload: apiPayload});
    this.props.navigation.navigate('InvitePlayers');
  }

  _updateCampaignLength = num => {
    const { dispatch } = this.props;
    let newLength;
    if (num === 0) {newLength = '15'}
    else if (num === 1) {newLength = '30'}
    else if (num === 2) {newLength = '90'}
    dispatch({type: c.SET_CAMPAIGN_LENGTH, length: newLength})
  }

  _updateCampaignDifficulty = num => {
    const { dispatch } = this.props;
    let newDifficulty;
    if (num === 0) {newDifficulty = 'easy';}
    else if (num === 1) {newDifficulty = 'hard';}
    else if (num === 2) {newDifficulty = 'xtreme';}
    dispatch({type: c.SET_DIFFICULTY, difficultyLevel: newDifficulty})
  }

  _updateRandomEvents = num => {
    const { dispatch } = this.props;
    let newEvents;
    if (num === 0) {newEvents = 'low';}
    else if (num === 1) {newEvents = 'mid';}
    else if (num === 2) {newEvents = 'high';}
    dispatch({type: c.SET_EVENT_FREQUENCY, randomEvents: newEvents})
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
              bigValue={true}
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

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CreateCampaign);
