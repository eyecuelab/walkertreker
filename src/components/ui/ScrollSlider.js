import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import { withNavigation } from "react-navigation";
import AnimatedJournalText from './JournalUI/AnimatedJournalText';

import { SubHeader } from '../text';

class ScrollSlider extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps){
    if (prevProps.focused !== this.props.focused) {
      this.scroll.scrollTo({x:widthUnit*30*(this.props.focused-1)})
    }
  }

  scrollToInitialPosition = () => {
    this.scroll.scrollTo({x:widthUnit*30*(this.props.focused-1)})
  }
  
  render() {
    return(
      <View style={customStyles.slider}>

        <ScrollView horizontal='true'
                    decelerationRate={0.85}
                    onLayout={this.scrollToInitialPosition}
                    snapToInterval={widthUnit*30}
                    ref={(node)=> this.scroll = node}
                    showsHorizontalScrollIndicator={false}>

          <View style={customStyles.elementOnSlider} >
            <View style={[customStyles.sliderLine, {borderRightWidth: 0}]}></View>
          </View>
          
          {Object.keys(this.props.dataObj).map((key, index)=> {
              key = parseInt(key)
              return <TouchableWithoutFeedback key={index} onPress={()=>{this.props.onSliderClick(key)}}>
                        <View style={customStyles.elementOnSlider}>

                          { key === this.props.focused ? 
                          <AnimatedJournalText style={{textAlign: 'center'}} isFocused={true}>{this.props.label} {key}</AnimatedJournalText> :
                          <SubHeader style={customStyles.unfocused}>{this.props.label} {key}</SubHeader>  }

                        <View style={customStyles.sliderLine}></View>
                      </View>
                    </TouchableWithoutFeedback>
          })}
          <View style={customStyles.elementOnSlider} >
            <View style={[customStyles.sliderLine, {borderRightWidth: 0}]}></View>
          </View>

        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  slider: {
    marginTop: heightUnit*4,
    height: heightUnit*7,
    borderColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  unfocused: {
    textAlign: 'center', 
    opacity: 0.5,
    fontSize: widthUnit*5,
    lineHeight: widthUnit*3,
    paddingTop: widthUnit*4,
  },
  sliderLine: {
    width: '50%',
    borderColor: 'white',
    borderRightWidth: 1,
    height: heightUnit*3,
  },
  elementOnSlider: {
    width: widthUnit*30,
    textAlign: 'center',
  },
})

ScrollSlider.propTypes = {
  label : PropTypes.string,
  dataObj : PropTypes.object, // the keys of the object are what is mapping to the text of the slider with a optional label
  focused : PropTypes.number, // the key of the object that is currently focused
  onSliderClick : PropTypes.func.isRequired 
}

export default withNavigation(ScrollSlider);