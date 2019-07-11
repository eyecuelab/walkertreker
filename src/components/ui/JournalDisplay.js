import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import ScreenContainer from './../containers/ScreenContainer'; 
import { MainHeader, SubHeader, TextAlt } from './../text';


import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');



class JournalDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const entriesObj = this.props.entries
    return (
      <View style={customStyles.dayEntry}>
        <TextAlt style={customStyles.dayCount}>Day {this.props.entryDay}</TextAlt>
        {Object.keys(entriesObj).map((key) => {
          return <TextAlt key={entriesObj[key].id}>{entriesObj[key].entry}</TextAlt>
        })}
      </View>
    );
  }
}


const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  dayEntry: {
    backgroundColor: 'rgba(0,0,0,0.4)', 
    padding: widthUnit*5,
    marginTop: widthUnit*5,
    marginBottom: widthUnit*5,
    flex: 1,
  },
  dayCount: {
    fontFamily: 'gore',
    justifyContent: 'flex-start'
  },
})

export default JournalDisplay;