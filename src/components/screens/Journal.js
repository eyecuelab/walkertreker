import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ImageBackground, ScrollView, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenContainer from '../containers/ScreenContainer';  
import { SubHeader } from './../text';
import defaultStyle from '../../styles/defaultStyle';
import JournalDisplay from '../ui/JournalUI/JournalDisplay'
import JournalDaySlider from '../ui/JournalUI/JournalDaySlider'
import AnimatedCampaignHeader from '../ui/AnimatedCampaignHeader';

class Journal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      focusedDay: this.props.campaign.currentDay,
    }
    
  }

  componentWillMount(){
    this.getEntriesByDay()
    this.scrollY = new Animated.Value(0);
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
    this.setState({ focusedDay: day })
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
          <ScreenContainer>

            <AnimatedCampaignHeader scrollY={this.scrollY}/>

            {
              this.props.campaign.journals.length 
            
              ? 
              
              <View style={{width: '100%', flex: 1 }}>
                
                <View style={customStyles.daySlider}>
                  <JournalDaySlider 
                    entryObj={this.entryObj}
                    focusedDay={this.state.focusedDay}
                    onDaySliderClick={(day) => this._handleDaySliderClick(day)} />
                </View> 

                <ScrollView style={{flex: 1, width: '100%', height: '100%' }} 
                  onScroll={Animated.event(
                      [
                          { nativeEvent: { contentOffset: { y: this.scrollY } } }
                      ]
                  )}>
                  <JournalDisplay entries={this.entryObj[this.state.focusedDay]} entryDay={this.state.focusedDay}/>
                </ScrollView>

              </View> 
              
              : 
              
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
    marginTop: heightUnit*2,
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
