import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet, Easing } from 'react-native';

export default class TestScreen extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }
    componentDidMount () {
      this.animate()
    }

    animate () {
      this.animatedValue.setValue(0)
      //Animated .timing() Method
      Animated.timing(
        //First Argument is a AnimatedValue
        this.animatedValue,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear
        }
      ).start(() => this.animate())
    } 

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    })
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0]
    })
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })
    const rotateX = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    })
    
    const color = this.animatedValue.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: ["red", "green", "blue"]
    })

    return (
      <View style={styles.container}>
      <Animated.View
        style={{
          marginLeft,
          height: 30,
          width: 40,
          backgroundColor: color}} />
      <Animated.View
        style={{
          opacity,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'blue'}} />
      <Animated.View
        style={{
          marginLeft: movingMargin,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'orange'}} />
      <Animated.Text
        style={{
          fontSize: textSize,
          marginTop: 10,
          color: 'green'}} >
          Animated Text!
      </Animated.Text>
      <Animated.View
        style={{
          transform: [{rotateX}],
          marginTop: 50,
          height: 30,
          width: 40,
          backgroundColor: 'black'}}>
        <Text style={{color: 'white'}}>Hello from TransformX</Text>
      </Animated.View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150
  }
})

