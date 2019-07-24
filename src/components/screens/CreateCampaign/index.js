import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, ImageBackground, AsyncStorage, ScrollView } from 'react-native';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ButtonWithLoading } from './../../ui/Buttons';
import TwoButtonOverlay from '../../ui/TwoButtonOverlay';
import ThreeButtonToggle from '../../ui/ThreeButtonToggle';

import defaultStyle from '../../../styles/defaultStyle';
import constants from '../../../constants';
const { c } = constants;

class CreateCampaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      length: '15',
      difficultyLevel: 'easy',
      randomEvents: 'low',
      isLoading: false
    }
  }

  componentDidUpdate() {
    this.props.navigation.navigate("Lobby");
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = nextProps.campaign.players && nextProps.campaign.players.length > 0 && this.props.campaign.players && this.props.campaign.players.length === 0 ;
    return shouldUpdate;
  }

  _generateCampaign = async () => {
    await this.setState({isLoading: true})
    const { dispatch } = this.props;
    const now = new Date();
    const timezone = -now.getTimezoneOffset()/60;
    let apiPayload = {
      "params": {
        "campaignLength": this.state.length,
        "difficultyLevel": this.state.difficultyLevel,
        "randomEvents": this.state.randomEvents,
      },
      "playerId": this.props.player.id,
      "timezone": timezone
    }

    apiPayload = JSON.parse(JSON.stringify(apiPayload));
    await dispatch({type: c.SET_INITIAL_CAMPAIGN_DETAILS, payload: apiPayload});
  }

  _updateCampaignLength = num => {
    let newLength;
    if (num === 0) {newLength = '15'}
    else if (num === 1) {newLength = '30'}
    else if (num === 2) {newLength = '90'}
    this.setState({length: newLength})
  }

  _updateCampaignDifficulty = num => {
    let newDifficulty;
    if (num === 0) {newDifficulty = 'easy';}
    else if (num === 1) {newDifficulty = 'hard';}
    else if (num === 2) {newDifficulty = 'xtreme';}
    this.setState({difficultyLevel: newDifficulty})
  }

  _updateRandomEvents = num => {
    let newEvents;
    if (num === 0) {newEvents = 'low';}
    else if (num === 1) {newEvents = 'mid';}
    else if (num === 2) {newEvents = 'high';}
    this.setState({randomEvents: newEvents})
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%',}}
      >
        <View style={styles.container}>
          <Text style={styles.headline}>NEW CAMPAIGN</Text>
          <View style={createCampaignStyle.scrollviewContainer}>
            <ScrollView>
            <View style={createCampaignStyle.toggleContainer}>
            <ThreeButtonToggle
            title="Number of days"
            subtitle=""
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
            subtitle=""
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
            subtitle=""
            button1value="Low"
            button1label="About 1"
            button2value="Mid"
            button2label="About 2"
            button3value="High"
            button3label="About 3"
            titleColor="white"
            handleUpdate={this._updateRandomEvents}
            />
            </View>
            </ScrollView>
          </View>
          <View style={createCampaignStyle.buttonContainer}>
            <ButtonWithLoading isLoading={this.state.isLoading} title="Create Campaign" onButtonPress={this._generateCampaign}/>
            
          </View>
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const createCampaignStyle = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'black',
    width: '100%',
    height: heightUnit*8,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  toggleContainer: {
    marginTop: heightUnit*2.5,
  },
  scrollviewContainer: {
    height: heightUnit*65,
  }
})

CreateCampaign.propTypes = {
  screenProps: PropTypes.any,
}

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CreateCampaign);
