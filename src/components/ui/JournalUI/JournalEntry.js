import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import constants from '../../../constants';
const { paint } = constants;
const { paintArray } = paint;

import { MainText, TextWithBackground } from '../../text';

class JournalEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.entry ? this.entries = this.props.entry.split('//') : null;
  }

  getBGimage = () => {
    const num = Math.floor(Math.random()*paintArray.length)
    return paintArray[num]
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
                  return <TextWithBackground key={index} text={vote} image={this.getBGimage()}/>
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
  playerVotes: {
    paddingHorizontal: widthUnit*2,
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