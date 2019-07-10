import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import ScreenContainer from './../containers/ScreenContainer';  

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');



class JournalDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: widthUnit*5}}>
        <Text>{this.props.entryText}</Text>
      </View>
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
    fontSize: widthUnit * 12,
    lineHeight: widthUnit * 9,
    paddingTop: widthUnit * 3,
    color: 'white',
  },
  textContainer: {
    // marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    padding: widthUnit,
  },
  text: {
    lineHeight: heightUnit * 3.75,
  },
  buttonContainer: {
    marginTop: heightUnit,
    width: '100%',
    height: heightUnit * 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: widthUnit * 2,
  },
  marginTop: {
    marginTop: heightUnit * 2.5
  }
})

export default JournalDisplay;