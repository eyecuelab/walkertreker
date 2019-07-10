import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenContainer from './../containers/ScreenContainer';  
import { MainHeader, SubHeader } from './../text';

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
    // console.log("IN JOURNAL", this.props.campaign.journals)
    this.getEntriesByDay()
  }

  getEntriesByDay(){
    let currentDay = 0
    let entryObj = {}
    let index = 0;
    this.props.campaign.journals.forEach((entry) => {
      if (entry.entryDay !== currentDay) {
        index=0;
        entryObj = Object.assign({}, entryObj, {[entry.entryDay]: {[index]: entry}})
        currentDay ++;
      } else {
        newDay = {[entry.entryDay] : {...entryObj[entry.entryDay], [index]: entry}}
        entryObj = Object.assign({}, entryObj, newDay)
      }
      index++;
    })
    console.log("ENTRY OBJECT:", entryObj)
    this.setState({entryObj})
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
          <ScreenContainer>
            <Text style={customStyles.headerStyle}>Campaign {'\n'}Journal</Text>
    
              <ScrollView style={{width: '100%', height: '100%'}}>
                {Object.keys(this.state.entryObj).map((day, index)=> {
                  return <JournalDisplay key={index} entries={this.state.entryObj[day]} entryDay={day}/>
                })}
              </ScrollView>
    
          </ScreenContainer>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  headerStyle: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontSize: widthUnit*9,
    lineHeight: widthUnit*10,
    color: 'white',
    fontFamily: 'gore',
  },
})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Journal);