import { SubHeader } from './../../text';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

const AnimatedSubHeader = Animated.createAnimatedComponent(SubHeader)

class AnimatedJournalText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue : new Animated.Value(0.5)
    };
  }

  componentDidMount() {
      console.log("starting animation?")
          Animated.timing(
            this.state.animatedValue,
            {
              toValue: 1,
              easing: Easing.elastic(3),
              duration: 600,
            }
          ).start()
    }
  
  

  render() {
    const fontSize = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5],
      outputRange: [widthUnit*5, widthUnit*6]
    });
    
    return (
      <AnimatedSubHeader style={{textAlign: "center", opacity: this.state.animatedValue, fontSize}}>{this.props.children}</AnimatedSubHeader>
    );
  }
}


export default AnimatedJournalText;
