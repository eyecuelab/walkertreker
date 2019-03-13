import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ToastAndroid, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c, storeData, retrieveData } = constants;

import defaultStyle from '../../styles/defaultStyle';

import Avatar from '../ui/Avatar';
import ThreeInfoSquares from '../ui/ThreeInfoSquares';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import DayCounter from '../ui/DayCounter';

class CampaignSummary extends React.Component {

  constructor(props) {
    super(props)
    const toast = this.props.navigation.getParam('toast')
    if (toast) {
      this._showToast(toast.msg)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.campaign.players !== null) {
      for (let newPlayer of this.props.campaign.players) {
        const id = newPlayer.id
        let filtered = prevProps.campaign.players.filter(player => player.id === id)
        const oldPlayer = filtered[0]
        const today = this.props.campaign.currentDay
        if (newPlayer.steps[today] !== oldPlayer.steps[today]) {
          this._showToast(`${newPlayer.displayName}'s steps have updated.`)
        }
      }
    }
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
      return 'High';
    } else if (player.hunger >= 34 && player.hunger < 67) {
      return 'OK';
    } else if (player.hunger >= 67) {
      return 'Low';
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
    // if (true) {
      return (
        <TwoButtonOverlay
          button1onPress={this._onButtonPressSafehouse}
          button1title='Safehouse'
          button1color='black'
          button1isDisabled={false}
          button2onPress={this._onButtonPressInventory}
          button2title='Inventory'
          button2color='black'
          button2isDisabled={false} />
      );
    } else {
      return (
        <View style={customStyles.buttonContainer}>
          <SingleButtonFullWidth
            title='Inventory'
            backgroundColor='black'
            onButtonPress={this._onButtonPressInventory} />
        </View>
      );
    }
  }

  _showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <DayCounter campaign={this.props.campaign} />
          <Text style={styles.headline}>Campaign Summary</Text>
          <ScrollView>
            {this.props.campaign.players.map(player => {
              return (
                <View key={player.id} style={customStyles.playerInfoContainer}>
                  <ThreeInfoSquares
                    title={player.displayName}
                    player={player}
                    bigValue={true}
                    button1label='Progress'
                    button1value={this._displayStepPercentage(player) + '%'}
                    button2label='Health'
                    button2value={this._displayHealthLevel(player)}
                    button3label='Hunger'
                    button3value={this._displayHungerLevel(player)}
                  />
                </View>
              )
            })}
          </ScrollView>

          <View style={customStyles.bottom}>

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
    marginTop: heightUnit*3,
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: widthUnit*2,
  },
  playerInfoContainer: {
    marginBottom: heightUnit*2
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
