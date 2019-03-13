import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');

import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import DayCounter from '../ui/DayCounter';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';

class RandomEvent extends React.Component {

  constructor(props) {
    super(props)
    // hard-coding event info for now, this would presumably come from server and get mapped to these values in state later.
    const now = new Date();
    const then = new Date(now.getTime() + 15*60000) // 15 minutes from now
    const evt = events[Math.floor(Math.random() * events.length)];
    this.state = {
      start: now,
      end: then,
      timeLeft: '',
      antecedent: evt.antecedent,
      optionAButton: evt.optionAButton,
      optionBButton: evt.optionBButton,
    }
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this._updateTime(), 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  _updateTime = () => {
    let timeLeft = this.state.timeLeft
    const now = new Date()
    const msRemaining = this.state.end.getTime() - now.getTime()
    if (msRemaining <= 0) { timeLeft = '00:00' }
    else {
      const minutes = Math.floor(msRemaining / 60000);
      const seconds = Math.floor((msRemaining % 60000) / 1000);
      const minStr = (minutes < 10) ? `0${minutes}` : `${minutes}`;
      const secStr = (seconds < 10) ? `0${seconds}` : `${seconds}`;
      timeLeft = `${minStr}:${secStr}`
    }
    this.setState({ timeLeft })
  }

  _timerDisplay = () => {
    if (this.state.timeLeft == '') {
      return "  "
    } else {
      return `Voting Ends In ${this.state.timeLeft}`
    }
  }

  _vote(opt) {
    const OPTIONS = {
      A: `You voted for ${this.state.optionAButton}`,
      B: `You voted for ${this.state.optionBButton}`
    }
    console.log(OPTIONS[opt])
    this.props.navigation.navigate('CampaignSummary')
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}} >
        <View style={styles.container}>

            <View style={{width: '100%', height: '100%'}}>
              <ImageBackground
                source={event_bg}
                resizeMode={'cover'}
                style={customStyles.randomEventBg}>

                <View style={{flex: 4, backgroundColor: 'rgba(0,0,0,0.4)', padding: widthUnit*5}}>
                  <View style={[customStyles.container, {flex: 3}]}>
                    <Text style={styles.label}>{this._timerDisplay()}</Text>

                    <View style={customStyles.headlineContainer}>
                      <Text style={styles.headline}>Group{'\n'}Decision</Text>
                    </View>

                    <View style={[customStyles.textContainer, customStyles.marginTop]}>
                      <Text style={[styles.plainText, customStyles.text]}>{this.state.antecedent}</Text>
                    </View>
                  </View>

                  <View style={[customStyles.container, {flex: 1, alignContent: 'flex-end', padding: widthUnit}]}>
                    <View style={customStyles.buttonContainer}>
                      <SingleButtonFullWidth
                        title={this.state.optionAButton}
                        backgroundColor="darkred"
                        onButtonPress={() => this._vote("A")}
                      />
                    </View>
                    <View style={customStyles.buttonContainer}>
                      <SingleButtonFullWidth
                        title={this.state.optionBButton}
                        backgroundColor="darkred"
                        onButtonPress={() => this._vote("B")}
                      />
                    </View>
                  </View>
                </View>


              </ImageBackground>
            </View>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  headlineContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  headline: {
    fontFamily: 'gore',
    fontSize: widthUnit*12,
    lineHeight: widthUnit*9,
    paddingTop: widthUnit*3,
    color: 'white',
  },
  textContainer: {
    // marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    padding: widthUnit,
  },
  text: {
    lineHeight: heightUnit*3.75,
  },
  buttonContainer: {
    marginTop: heightUnit,
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // margin: widthUnit*2,
    flex: 1,
    justifyContent: 'flex-start',
    // padding: widthUnit,
    // paddingTop: widthUnit*2,
    // backgroundColor: 'pink',
  },
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    // padding: widthUnit*3,
    // borderWidth: widthUnit*2,
    // borderColor: 'black',
    // marginLeft: widthUnit*3,
    justifyContent: 'flex-start',
    // opacity: 0.2,
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: widthUnit*2,
  },
  marginTop: {
    marginTop: heightUnit*2.5
  }
})

function mapStateToProps(state) {
  return {
    // appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
    // player: state.player,
  }
}

export default connect(mapStateToProps)(RandomEvent);
