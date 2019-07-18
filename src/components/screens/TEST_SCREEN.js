import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet, Easing } from 'react-native';
import { Label } from './../text';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const widthUnit = wp('1%');
const heightUnit = hp('1%');

export default class TestScreen extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.state = {
      stepCount : 0
    }
  }
    componentDidMount () {
      this.animate()
    }

    animate () {
      this.animatedValue.addListener( ({ value }) => {
        this.setState({ stepCount : parseInt(value, 10)});
      });
      Animated.timing(
        this.animatedValue,
        {
          toValue: 3500,
          duration: 1800,
          easing: Easing.ease
        }
      ).start()
    } 

  render() {
    const width = this.animatedValue.interpolate({
      inputRange: [0, 3500],
      outputRange: ['0%', '100%']
    });

    return (
    <View style={styles.screenContainer}>
      <View style={[styles.outerContainer]}>
        <Animated.View style={[styles.innerContainer, {width: width}]}>
        </Animated.View>
          <Label style={styles.text}>{this.state.stepCount}</Label>
      </View>
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    height: heightUnit*6,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderColor: "#A92425",
    borderWidth: 3,
    justifyContent: 'center',
  },
  innerContainer: {
    height: "100%",
    width: "0%",
    backgroundColor: "#A92425"
  },
  screenContainer: {
    flex: 1,
    height: "100%",
    justifyContent: 'center',
    alignContent: "center",
    padding: widthUnit*3
  },
  text: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center"
  }
})

