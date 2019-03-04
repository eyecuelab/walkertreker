import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c, storeData, retrieveData } = constants;

import defaultStyle from '../../styles/defaultStyle';

import Avatar from '../ui/Avatar';
import ThreeInfoSquares from '../ui/ThreeInfoSquares';

class CampaignSummary extends React.Component {

  constructor(props) {
    super(props)
  }

  _displayStepPercentage = (player) => {
    const today = this.props.campaign.currentDay;
    console.log('today is ', today);
    const percent = Math.floor((((player.steps[today]) / (player.stepTargets[today])) * 100));
    return percent.toString();
  }

  _displayHealthLevel = (player) => {
    if (player.health > 0 && player.health < 34) {
      return 'Poor';
    } else if (player.health >= 34 && player.health < 67) {
      return 'Fair';
    } else if (player.health >= 67) {
      return 'Good';
    } else {
      return 'Dead';
    }
  }

  _displayHungerLevel = (player) => {
    if (player.hunger > 0 && player.hunger < 34) {
      return 'High';
    } else if (player.hunger >= 34 && player.hunger < 67) {
      return 'OK';
    } else if (player.hunger >= 67) {
      return 'Low';
    } else {
      return 'Dead';
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <Text style={styles.headline}>CAMPAIGN SUMMARY</Text>
          <Text style={styles.headline}>Players</Text>
          <View>
            {this.props.campaign.players.map(player => {
              return (
                <ThreeInfoSquares
                  key={player.id}
                  title={player.displayName}
                  button1label='Progress'
                  button1value={this._displayStepPercentage(player)}
                  button2label='Health'
                  button2value={this._displayHealthLevel(player)}
                  button3label='Hunger'
                  button3value={this._displayHungerLevel(player)} />
              )
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle)
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CampaignSummary)
