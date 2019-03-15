import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c } = constants;
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import DayCounter from '../ui/DayCounter';

const attack_bg = require('../../../assets/attack_bg.png');

// import data from '../../constants/endofcampaigndummydata'

class CampaignIsLost extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.navigation.getParam('data')
    const finalCampaignState = data.finalCampaignState
    const causeOfDeath = data.causeOfDeath
    const deadPlayers = data.deadPlayers
    this.state = { finalCampaignState, causeOfDeath, deadPlayers }
  }

  deadPlayersPlainText() {
    const names = []
    for (let player of this.state.deadPlayers) {
      names.push(player.displayName)
    }
    let string = ``
    if (names.length == 1) {
      string = names[0]
    } else {
      for (let i = 0; i < names.length - 1; i++) {
        string = string + `${names[i]}, `
      }
      string = string + `and ${names[names.length - 1]}`
    }
    return string
  }

  endGameText() {
    let text = '';
    if (this.state.causeOfDeath == 'beaten') {
      text = `Your party, already tired and slowed from previous encounters, failed to meet at the safehouse before nightfall. Suddenly beset on all sides by a horde of undead, ${this.deadPlayersPlainText()} were finally overcome. What happened to them next... is best left unsaid; those still among the living will remember them as they were in better times, and try to carry on.`
    } if (this.state.causeOfDeath == 'starved') {
      text = `After so many long days of running and fighting and low on energy and resources, on day ${this.state.finalCampaignState.currentDay}, your party is forced to make a difficult decision. Weak with hunger and unable to continue, you are forced to leave ${this.deadPlayersPlainText()} behind, knowing full well what this means. Part of staying alive in such a situation also means having to live with yourself on days like this.`
    }
    return (<Text style={styles.plainText}>{text}</Text>)
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={{width: '100%', height: '100%'}}>
            <ImageBackground
              source={attack_bg}
              resizeMode={'cover'}
              style={customStyles.bgImage}
            >
              <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: widthUnit*5}}>
                <View style={customStyles.headerContainer}>
                  <DayCounter campaign={this.state.finalCampaignState} />
                  <Text style={styles.headline}>Campaign{"\n"}Lost</Text>
                </View>
                <View style={customStyles.contentContainer}>
                  {this.endGameText()}
                </View>
                <View style={customStyles.buttonContainer}>
                  <SingleButtonFullWidth
                    title="Start Again"
                    backgroundColor="darkred"
                    onButtonPress={() => this.props.navigation.navigate('About')}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create(defaultStyle)
const widthUnit = wp('1%')
const heightUnit = hp('1%')
const customStyles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    marginBottom: heightUnit*2,
    width: '100%',
  },
  contentContainer: {
    // paddingTop: heightUnit,
    // paddingBottom: heightUnit,
    flex: 5,
    width: '100%',
    marginTop: heightUnit*2.5
    // borderColor: 'black',
    // borderWidth: 1,
  },
  buttonContainer: {
    // marginTop: heightUnit*5,
    // marginBottom: heightUnit*5,
    width: '100%',
    height: heightUnit*10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(CampaignIsLost)
