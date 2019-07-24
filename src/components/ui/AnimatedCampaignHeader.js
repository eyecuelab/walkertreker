import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { MainHeader } from './../text';
import DayCounter from './DayCounter';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

const AnimatedMainHeader = Animated.createAnimatedComponent(MainHeader);



class AnimatedCampaignHeader extends Component {
  render() {
    const animatedFontSize = this.props.scrollY.interpolate({
      inputRange: [0, widthUnit*20],
      outputRange: [widthUnit*10.5, widthUnit*5],
      extrapolate: 'clamp'
    });
    
    const paddingTop = this.props.scrollY.interpolate({
      inputRange: [0, widthUnit*20],
      outputRange: [widthUnit*1, 0]
    });

    return (
      <View>
        <DayCounter campaign={this.props.campaign} />
        <AnimatedMainHeader style={{fontSize: animatedFontSize, paddingTop: paddingTop}}>{this.props.title}</AnimatedMainHeader>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { campaign: state.campaign }
}

export default connect(mapStateToProps)(AnimatedCampaignHeader);