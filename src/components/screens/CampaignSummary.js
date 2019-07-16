import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ToastAndroid, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';

import defaultStyle from '../../styles/defaultStyle';
import { MainHeader } from './../text';
import ThreeInfoSquares from '../ui/ThreeInfoSquares';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import ScreenContainer from '../containers/ScreenContainer';
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
    // if (prevProps.campaign.players !== null) {
    //   for (let newPlayer of this.props.campaign.players) {
    //     const id = newPlayer.id
    //     let filtered = prevProps.campaign.players.filter(player => player.id === id)
    //     const oldPlayer = filtered[0]
    //     const today = this.props.campaign.currentDay
    //     if (newPlayer.steps[today] !== oldPlayer.steps[today]) {
    //       this._showToast(`${newPlayer.displayName}'s steps have updated.`)
    //     }
    //   }
    // }
  }

  _displayStepPercentage = (player) => {
    const today = this.props.campaign.currentDay;

    // Code for Percentage based Display
    // const percent = Math.floor((((player.steps[today]) / (player.stepTargets[today])) * 100));
    // return percent;

    // Code for xxxx / yyyy display

    return `${player.steps[today]} / ${player.stepTargets[today]}`
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

  _onButtonPressNothing = () => {
    return;
  }

  // TODO: when INVENTORY is fleshed out, make sure to put this function in there too
  _submitConditionalRender = () => {
    if (this.props.player.steps) {
    const stepsToday = this.props.player.steps[this.props.campaign.currentDay];
    const stepTargetToday = this.props.player.stepTargets[this.props.campaign.currentDay];
    if (stepsToday > stepTargetToday) {
    // if (false) {
      return (
        <View style={{width: '100%'}}>
          <View style={customStyles.buttonContainer}>
            <SingleButtonFullWidth
              title='Safehouse'
              backgroundColor='black'
              onButtonPress={this._onButtonPressSafehouse} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{width: '100%'}}>
          <View style={customStyles.buttonContainer}>
            <SingleButtonFullWidth
              title='Safehouse'
              backgroundColor='darkgray'
              onButtonPress={this._onButtonPressNothing} />
          </View>
        </View>
      );
    }
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
        <ScreenContainer>
          <DayCounter campaign={this.props.campaign} />
          <View style={{flex: 1, alignItems: "center"}}>
            <MainHeader>SUMMARY</MainHeader>
          </View>
          
          <ScrollView style={customStyles.scrollContainer}>
            {this.props.campaign.players.map(player => {
              return (
                <View key={player.id} style={customStyles.playerInfoContainer}>
                  <ThreeInfoSquares
                    title={player.displayName}
                    player={player}
                    bigValue={false}
                    button1label='Progress'
                    button1value={this._displayStepPercentage(player)}
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
        </ScreenContainer>
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
    marginTop: widthUnit * 2,
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
    marginTop: heightUnit*2,
    marginBottom: heightUnit*2
  },
  scrollContainer: {
    marginTop: heightUnit*2.5
  }
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    steps: state.steps,
  }
}

export default connect(mapStateToProps)(CampaignSummary)
