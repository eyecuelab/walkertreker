import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const vote_bg = require('../../../../assets/paintstroke/Paint_Stroke.png');

import { MainText } from '../../text';

class JournalEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.entry ? this.entries = this.props.entry.split('//') : null;
  }

  render() {
    return (
      this.props.entry ? 
      <View style={customStyles.entryBox} >
        <View>
          <MainText style={customStyles.entryLine}>{this.entries[0]}</MainText>
          {this.props.eventNumber && this.props.votingList.length ? 
              <View style={customStyles.playerVotes}>
                {this.props.votingList.map((vote, index) => {
                  return <ImageBackground source={vote_bg} key={index}
                  resizeMode={'stretch'}
                  style={customStyles.VoteBg}
                  overflow='visible'>
                  <MainText style={customStyles.voteText}>{vote}</MainText>
                </ImageBackground>
                })}
              </View>
            : null }
          {this.entries[1] ? <MainText>{this.entries[1]}</MainText> : null}
        </View>
      </View> : null
    )
  }
}

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  VoteBg: {
    width: '100%',
    height: undefined,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: widthUnit*3,
  },
  playerVotes: {
    paddingHorizontal: widthUnit*2,
  },
  voteText: {
    fontFamily: 'Gill Sans MT Condensed Bold',
    color: 'white',
    textAlign: 'center',
  },
  entryBox: {
    backgroundColor: 'rgba(110,14,15,0.5)', 
    marginBottom: heightUnit*2,
    padding: heightUnit*3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6e0e0f',
  },
  entryLine: {
    fontSize: widthUnit*5.5,
  }

})

export default JournalEntry;