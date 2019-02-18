import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { v4 } from 'uuid';
import { connect } from 'react-redux';


import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import ThreeButtonToggle from '../ui/ThreeButtonToggle';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c } = constants;

class CreateCampaign extends React.Component {

  constructor(props) {
    super(props);
    // remove this state after refactor
    // this.state = {
    //   campaignLength: '15', // options: '15', '30', '90'
    //   difficultyLevel: 'easy', // options: 'easy', 'hard', 'xtreme'
    //   randomEvents: 'low' // options: 'low', 'mid', 'high'
    // }
  }

  componentDidMount() {

  }

  // this needs to send a post event to the server when the `new campaign` button is pushed
  async _generateCampaign() {
    const { dispatch } = this.props;
    const gameId = v4();
    const userId = await AsyncStorage.getItem('userId');
    // Below in payload I am just sketching out what we might want an initial game object to look like, this is very flexible. Essentially here is where we want to initialize our game object and populate the player list first with the person that started the game, using their phone number as a unique identifier (just to start I have hard coded that with a fake phone number, later we will get this from the phone itself.)
    const payload = {
      game: {
        id: gameId,
        campaignLength: this.props.campaign.length,
        difficultyLevel: this.props.campaign.difficultyLevel,
        randomEvents: this.props.campaign.randomEvents,
        numPlayers: 1,
        players: { // we can probably take this out all togetht
          [userId]: {
            id: userId, // this is gonna be generated on appload and stored in async storage
            name: 'Joe',
          },
        },
      }
    }
    let apiPayload = {
      "params": {
        "campaignLength": this.props.campaign.length,
        "difficultyLevel": this.props.campaign.difficultyLevel,
        "randomEvents": this.props.campaign.randomEvents,
        "startNow": false,
      }
    }
    console.log('apiPayload ',apiPayload);
    apiPayload = JSON.parse(JSON.stringify(apiPayload))

    dispatch({type: c.SET_INITIAL_CAMPAIGN_DETAILS, payload: apiPayload});
    // ^ this needs to be watched by a saga and send off an api call to the server with that payload

    this.props.navigation.navigate('InvitePlayers', payload);
  }

  _updateCampaignLength = num => {
    const { dispatch } = this.props;
    let newLength;
    if (num === 0) {newLength = '15'}
    else if (num === 1) {newLength = '30'}
    else if (num === 2) {newLength = '90'}
    dispatch({type: c.SET_CAMPAIGN_LENGTH, campaignLength: newLength})
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
  }
}

export default connect(mapStateToProps)(CreateCampaign);
