import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import constants from '../../../constants';
const { paint } = constants;
const { paintArray } = paint;
const paper = require('../../../../assets/burnt-paper.png');


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

      <ImageBackground 
        source={paper}
        resizeMode={'stretch'}
        style={customStyles.paperBg} >

      { this.entries[1] ? 
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
            <MainText style={customStyles.entryLine}>{this.entries[1]}</MainText>
          </View>
        </View>

        : <View style={customStyles.dailyEntryBox} >
            <MainText style={customStyles.entryLine}>{this.entries[0]}</MainText>
          </View>
      }

      </ImageBackground> : null
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
    paddingHorizontal: heightUnit*4,
    paddingVertical: heightUnit*6,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyEntryBox: {
    paddingHorizontal: heightUnit*4,
    paddingVertical: heightUnit*3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryLine: {
    fontSize: widthUnit*6,
    color: 'black',
  },
  paperBg: {
    width: undefined,
    height: undefined,
    marginBottom: heightUnit*2,
  }

})

export default JournalEntry;