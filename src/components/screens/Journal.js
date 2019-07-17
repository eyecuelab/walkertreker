import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenContainer from '../containers/ScreenContainer';  
import { MainHeader, MainText, SubHeader } from './../text';

import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import JournalDisplay from '../ui/JournalDisplay'

class Journal extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
    this.getEntriesByDay()
  }

  getEntriesByDay(){
    console.log("THESE ARE THE JOURNAL ENTRIES", this.props.campaign.journals)
    let currentDay = 0
    let entryObj = {}
    let index = 0;
    if (this.props.campaign.journals) {
      // need to sort entries by day first
      var sortedJournals = this.props.campaign.journals.slice(0);
      sortedJournals.sort(function(a,b) {
          return a.entryDay - b.entryDay;
      });
      // then create the entry object for display
      sortedJournals.forEach((entry) => {
        if (entry.entryDay !== currentDay) {
          index = 0;
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
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
          <ScreenContainer>
            <DayCounter campaign={this.props.campaign} />
            
            <View style={{ alignItems: "center"}}>
              <MainHeader>Journal</MainHeader>
            </View>
            <View style={customStyles.daySlider}>
              <ScrollView horizontal='true'
                          decelerationRate={0}
                          snapToInterval={widthUnit*30}
                          snapToAlignment={"center"}>
                <View style={customStyles.dayOnSlider}>
                  <View style={[customStyles.sliderLine, {borderRightWidth: 0}]}></View>
                  <SubHeader style={{textAlign: 'center'}}></SubHeader>
                </View>
                {Object.keys(this.state.entryObj).reverse().map((day, index)=> {
                    return <View key={index} style={customStyles.dayOnSlider}>
                            <View style={customStyles.sliderLine}></View>
                            <SubHeader style={{textAlign: 'center'}}>Day {day}</SubHeader>
                          </View>
                  })}
                <View style={customStyles.dayOnSlider}>
                  <View style={customStyles.sliderLine}></View>
                  <SubHeader style={{textAlign: 'center'}}>DAY 5</SubHeader>
                </View>
                <View style={customStyles.dayOnSlider}>
                  <View style={customStyles.sliderLine}></View>
                  <SubHeader style={{textAlign: 'center'}}>DAY 6</SubHeader>
                </View>
              </ScrollView>
            </View>
            {/* <View style={{height: "80%"}}> */}
                <ScrollView style={{width: '100%', height: '100%'}}>
                {Object.keys(this.state.entryObj).reverse().map((day, index)=> {
                  return <JournalDisplay key={index} entries={this.state.entryObj[day]} entryDay={day}/>
                })}
                </ScrollView>
            {/* </View> */}
            
          </ScreenContainer>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  daySlider: {
    marginTop: heightUnit*4,
    height: heightUnit*12,
    borderColor: 'white',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  sliderLine: {
    width: '50%',
    borderColor: 'white',
    borderRightWidth: 1,
    height: heightUnit*4,
  },
  dayOnSlider: {
    width: widthUnit*30,
    textAlign: 'center',
  },
})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Journal);
