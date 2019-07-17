import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { events } = constants;

import { MainText } from './../text';

class JournalEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={customStyles.entryBox} >
        <View>
          <MainText style={customStyles.entryLine}>{this.props.entry}</MainText>
          {this.props.eventId ? 
            <View style={customStyles.playerVotes}>
              {this.props.votingList.map((vote, index) => {
                return <MainText style={{fontFamily: 'Gill Sans MT Condensed Bold'}} key={index}>{vote}</MainText>               
              })}
            </View>
              : null }
            <MainText>{}</MainText>
        </View>
      </View>
    )
  }
}

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  playerVotes: {
    padding: widthUnit*2,
  },
  entryBox: {
    marginTop: heightUnit*1.5,
    paddingBottom: heightUnit*2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.3, 
    borderColor: '#aaa',
  },
  border: {
    borderLeftWidth: 1.3, 
    borderColor: '#aaa',
    height: '90%',
    width: widthUnit*1,
  },
  entryLine: {
    marginLeft: widthUnit*2,
    fontSize: widthUnit*5.5,
  }

})

export default JournalEntry;