import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../../styles/defaultStyle';

import { TextAlt } from '../../text';
import JournalEntry from './JournalEntry';
import constants from '../../../constants';
const { events } = constants;

class JournalDisplay extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const entriesObj = this.props.entries
    return (
        Object.keys(entriesObj).map((key) => {
          if (events[entriesObj[key].eventNumber]) {
            return (
               <JournalEntry key={entriesObj[key].id} style={customStyles.entryLine} 
                 entry={entriesObj[key].entry} 
                 eventNumber={entriesObj[key].eventNumber} 
                 votingList={entriesObj[key].votingList} />
           )} else {
            return (
              <JournalEntry key={entriesObj[key].id} style={customStyles.entryLine} 
                entry={entriesObj[key].entry} />
            )}
          }
        )
    );
  }
}


const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  entryLine: {
    marginLeft: widthUnit*2,
    color: 'white',
    fontFamily: 'Gill Sans MT Condensed',
    fontSize: widthUnit*5.5,
  }

})

export default JournalDisplay;