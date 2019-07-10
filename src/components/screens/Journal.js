import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenContainer from './../containers/ScreenContainer';  

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');

import defaultStyle from '../../styles/defaultStyle';
import JournalDisplay from '../ui/JournalDisplay'

class Journal extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
    console.log("IN JOURNAL", this.props.campaign.journals)
    this.getEntriesByDay()
  }

  getEntriesByDay(){
    
    let currentDay = 0
    let entryObj = {}
    let index = 0;

    this.props.campaign.journals.forEach((entry) => {
      if (entry.entryDay !== currentDay) {
        index=0
        console.log("Adding a new day object")
        entryObj = Object.assign({}, entryObj, {[entry.entryDay]: {[index]: entry}})
        currentDay ++;
      } else {
        console.log('adding to object')
        newDay = {[entry.entryDay] : {...entryObj[entry.entryDay], [index]: entry}}
        console.log("new Day", {...entryObj[entry.entryDay]})
        console.log("new Day", newDay)
        entryObj = Object.assign({}, entryObj, newDay)
      }
      index++;
      console.log("ENTRY OBJECT:", entryObj)
    })
  }

  render() {
    const entries = this.props.campaign.journals;
    // console.log(entries)
    return (
      <ImageBackground
          source={this.props.backgroundImage}
          style={{width: '100%', height: '100%'}} >
          <ScreenContainer>
    
            <View style={{width: '100%', height: '100%'}}>
              <ImageBackground
                source={event_bg}
                resizeMode={'cover'}
                style={customStyles.randomEventBg}>
                <View >
                  {entries.map((entry, index)=> {
                    return <JournalDisplay key={index} entryText={entry.entry} entryDay={entry.entryDay}/>
                  })}
                </View>
              </ImageBackground>
            </View>
    
          </ScreenContainer>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Journal);