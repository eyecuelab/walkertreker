import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenContainer from '../containers/ScreenContainer';  
import { MainHeader, MainText, SubHeader } from './../text';

import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import JournalDisplay from '../ui/JournalDisplay'

const screenWidth = Dimensions.get('window').width
class Journal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      focusedDay: this.props.campaign.currentDay + 1,
    }
  }

  componentWillMount(){
    this.getEntriesByDay()
  }

  getEntriesByDay(){
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

  _handleDaySliderClick = (day) => {
    this.scroll.scrollTo({x:widthUnit*30*(day-1)})
    this.setState({ focusedDay: day})
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
                          snapToAlignment={"center"}
                          pagingEnabled={true}
                          ref={(node)=> this.scroll = node}
                          showsHorizontalScrollIndicator={false}>
                <View style={customStyles.dayOnSlider} >
                  <View style={[customStyles.sliderLine, {borderRightWidth: 0}]}></View>
                  <SubHeader style={{textAlign: 'center'}}></SubHeader>
                </View>


                {Object.keys(this.state.entryObj).map((day, index)=> {
                    day = parseInt(day)
                    return <TouchableWithoutFeedback key={index} onPress={()=>{this._handleDaySliderClick(day)}}>
                             <View style={customStyles.dayOnSlider}>
                              <View style={customStyles.sliderLine}></View>
        
                              { day === this.state.focusedDay ? 

                              <SubHeader style={{textAlign: 'center'}}>Day {day}</SubHeader> :

                              <SubHeader style={customStyles.unfocusedDay}>Day {day}</SubHeader>  }

                            </View>
                          </TouchableWithoutFeedback>
                })}
                <View style={customStyles.dayOnSlider} >
                  <View style={[customStyles.sliderLine, {borderRightWidth: 0}]}></View>
                  <SubHeader style={{textAlign: 'center'}}></SubHeader>
                </View>

              </ScrollView>
            </View>
            <ScrollView style={{width: '100%', height: '100%' }}>
              
            <JournalDisplay entries={this.state.entryObj[this.state.focusedDay]} entryDay={this.state.focusedDay}/>

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
  unfocusedDay: {
    textAlign: 'center', 
    opacity: 0.5,
    fontSize: widthUnit*6,
    lineHeight: widthUnit*5,
    paddingTop: widthUnit*4,
  },
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
