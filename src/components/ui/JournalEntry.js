import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';

import { MainText } from './../text';

class JournalEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={customStyles.entryBox} >
        <View style={customStyles.border}></View>
        <MainText numberOfLines={2} style={customStyles.entryLine}>{this.props.entry}</MainText>
      </View>
    )
  }
}

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  entryBox: {
    marginTop: heightUnit*1.5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    borderLeftWidth: 1.3, 
    borderColor: '#aaa',
    height: '80%',
    width: widthUnit*1,
  },
  entryLine: {
    marginLeft: widthUnit*2,
    color: 'white',
    fontFamily: 'Gill Sans MT Condensed',
    fontSize: widthUnit*5.5,
  }

})

export default JournalEntry;