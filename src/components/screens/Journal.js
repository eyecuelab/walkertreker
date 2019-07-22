import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenContainer from '../containers/ScreenContainer';  
import { MainHeader, MainText, SubHeader } from './../text';
import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import JournalDisplay from '../ui/JournalUI/JournalDisplay'
import JournalDaySlider from '../ui/JournalUI/JournalDaySlider'

class Journal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      focusedDay: this.props.campaign.currentDay,
    }
  }

  componentWillMount(){
    this.getEntriesByDay()
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      this.evaluateFocusedDay()
    });
  }

  componentWillUnmount(){
    this.focusListener.remove();
  }

  evaluateFocusedDay = () => {
    this.props.campaign.currentDay+1 in this.entryObj ? 
      this.setState({focusedDay: this.props.campaign.currentDay + 1}) : 
      this.setState({focusedDay: this.props.campaign.currentDay});
  }

  getEntriesByDay = async () => {
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
      this.entryObj = entryObj
      await this.evaluateFocusedDay()
    }
  }

  _handleDaySliderClick = (day) => {
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

            {this.props.campaign.journals.length ? 
            <View style={{width: '100%', height: '85%' }}>
              <View style={customStyles.daySlider}>
                <JournalDaySlider 
                  entryObj={this.entryObj}
                  focusedDay={this.state.focusedDay}
                  onDaySliderClick={(day)=>this._handleDaySliderClick(day)} />
              </View> 

              <ScrollView style={{width: '100%', height: '100%' }}>
                <JournalDisplay entries={this.entryObj[this.state.focusedDay]} entryDay={this.state.focusedDay}/>
              </ScrollView> 
            </View> : 
            <SubHeader style={customStyles.noJournalWarning}>There are no journal entries to display</SubHeader>
          }

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
  noJournalWarning: {
    letterSpacing: widthUnit*0.5, 
    lineHeight: widthUnit*8,
    padding: '10%',
    marginTop: widthUnit*10,
    textAlign: 'center',
    width: '100%',
  }
})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Journal);
