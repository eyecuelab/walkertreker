import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { MainText } from './../text';

class JournalEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.entries = this.props.entry.split('//')
  }

  render() {
    return (
      <View style={customStyles.entryBox} >
        <View>
          <MainText style={customStyles.entryLine}>{this.entries[0]}</MainText>
          {this.props.eventNumber ? 
            <View style={customStyles.playerVotes}>
              {this.props.votingList.map((vote, index) => {
                return <MainText style={{fontFamily: 'Gill Sans MT Condensed Bold'}} key={index}>{vote}</MainText>
              })}
            </View>
              : null }
            <MainText>{this.entries[1]}</MainText>
        </View>
      </View>
    )
  }
}

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  playerVotes: {
    paddingTop: widthUnit*2,
    paddingBottom: widthUnit*2,
  },
  entryBox: {
    marginTop: heightUnit*1.5,
    marginLeft: widthUnit*1.5,
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
    fontSize: widthUnit*5.5,
  }

})

export default JournalEntry;