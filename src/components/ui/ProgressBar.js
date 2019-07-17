import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import { Label } from './../text';
/////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');
/////////

class ProgressBar extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.state = {
      textValue : 0
    }
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    const ValueListener = this.animatedValue.addListener( ({ value }) => {
      this.setState({ textValue : parseInt(value, 10)});
    });
    Animated.timing(
      this.animatedValue,
      {
        toValue: this.props.value,
        duration: 1200,
        easing: Easing.ease
      }
    ).start();
  } 

  render() {
    const width = this.animatedValue.interpolate({
      inputRange: [0, this.props.targetValue],
      outputRange: ['0%', '100%']
    });
    return (
      <View style={[styles.outerContainer]}>
        <Animated.View style={[styles.innerContainer, {width: width}]}>
        </Animated.View>
          <Label size="sm" style={styles.text}>{this.state.textValue} / {this.props.targetValue} Steps</Label>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    height: heightUnit*8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderColor: "#FFF",
    borderWidth: 3,
    justifyContent: 'center',
  },
  innerContainer: {
    height: "100%",
    width: "0%",
    maxWidth: "100%",
    backgroundColor: "#A92425"
  },
  text: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center"
  }
})

ProgressBar.propTypes = {
  targetValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}

export default ProgressBar;