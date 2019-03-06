import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c, storeData, retrieveData } = constants;

import defaultStyle from '../../styles/defaultStyle';

import Avatar from '../ui/Avatar';
import ThreeInfoSquares from '../ui/ThreeInfoSquares';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';

class CampaignSummary extends React.Component {

  constructor(props) {
    super(props)
  }

  _displayStepPercentage = (player) => {
    const today = this.props.campaign.currentDay;
    const percent = Math.floor((((player.steps[today]) / (player.stepTargets[today])) * 100));
    return percent;
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
      return 'Starving';
    } else if (player.hunger >= 34 && player.hunger < 67) {
      return 'Hungry';
    } else if (player.hunger >= 67) {
      return 'Full';
    } else {
      return 'Dead';
    }
  }

  _onButtonPressInventory = () => {
    this.props.navigation.navigate('Inventory');
  }

  _onButtonPressSafehouse = () => {
    this.props.navigation.navigate('Safehouse');
  }

  // TODO: when INVENTORY is fleshed out, make sure to put this function in there too
  _submitConditionalRender = () => {
    if (this.props.steps.campaignDateArray[this.props.campaign.currentDay].goalMet) {
      return (
        <SingleButtonFullWidth
          title='Scavenge at Safehouse'
          backgroundColor='black'
          onButtonPress={this._onButtonPressSafehouse} />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.headline}>CAMPAIGN SUMMARY</Text>
          <Text style={styles.headline}>Players</Text>
          <View>
            {this.props.campaign.players.map(player => {
              return (
                <ThreeInfoSquares
                  key={player.id}
                  title={player.displayName}
                  bigValue={true}
                  button1label='Progress'
                  button1value={this._displayStepPercentage(player) + '%'}
                  button2label='Health'
                  button2value={this._displayHealthLevel(player)}
                  button3label='Hunger'
                  button3value={this._displayHungerLevel(player)} />
              )
            })}
          </View>
          <View style={customStyles.buttonContainer}>
            <SingleButtonFullWidth
              title='View Inventory'
              backgroundColor='black'
              onButtonPress={this._onButtonPressInventory} />
            {this._submitConditionalRender()}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle)
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: heightUnit*10,
    width: '100%',
    height: heightUnit*10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    steps: state.steps,
  }
}

export default connect(mapStateToProps)(CampaignSummary)
