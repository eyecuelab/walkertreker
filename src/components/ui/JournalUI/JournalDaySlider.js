import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../../styles/defaultStyle';
import { withNavigation } from "react-navigation";
import AnimatedJournalText from './AnimatedJournalText';

import { SubHeader } from '../../text';

class JournalDaySlider extends React.Component {
  constructor(props) {
    super(props)
  
  }

  componentDidUpdate(prevProps){
    if (prevProps.focusedDay !== this.props.focusedDay) {
      this.scroll.scrollTo({x:widthUnit*30*(this.props.focusedDay-1)})
    }
  }

  scrollToInitialPosition = () => {
    this.scroll.scrollTo({x:widthUnit*30*(this.props.focusedDay-1)})
  }
  
  render() {
   
    return(
      <ScrollView horizontal='true'
                  decelerationRate={0.85}
                  onLayout={this.scrollToInitialPosition}
                  snapToInterval={widthUnit*30}
                  // snapToAlignment={"center"}
                  // pagingEnabled={true}
                  ref={(node)=> this.scroll = node}
                  showsHorizontalScrollIndicator={false}>
        <View style={customStyles.dayOnSlider} >
          <View style={[customStyles.sliderLine, {borderRightWidth: 0}]}></View>
        </View>
        
        {Object.keys(this.props.entryObj).map((day, index)=> {
            day = parseInt(day)
            return <TouchableWithoutFeedback key={index} onPress={()=>{this.props.onDaySliderClick(day)}}>
                      <View style={customStyles.dayOnSlider}>
                      <View style={customStyles.sliderLine}></View>

                      { day === this.props.focusedDay ? 
                      <AnimatedJournalText style={{textAlign: 'center'}} isFocused={true}>Day {day}</AnimatedJournalText> :
                      <SubHeader style={customStyles.unfocusedDay}>Day {day}</SubHeader>  }

                    </View>
                  </TouchableWithoutFeedback>
        })}
        <View style={customStyles.dayOnSlider} >
          <View style={[customStyles.sliderLine, {borderRightWidth: 0}]}></View>
        </View>

      </ScrollView>
    )
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
    lineHeight: widthUnit*3,
    paddingTop: widthUnit*4,
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

export default withNavigation(JournalDaySlider);