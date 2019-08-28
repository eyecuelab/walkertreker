import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  InteractionManager,
  ImageBackground
} from "react-native";
import { MainHeader } from "../text";

const bg = require("../../../assets/bg.png");

const AnimatedMainHeader = Animated.createAnimatedComponent(MainHeader);
const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground
);

class SignInSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.AnimationValue = new Animated.Value(0);
    this.TextAnimationValue = new Animated.Value(0);
  }

  componentDidMount = () => {
    console.log("rendered sign in ");
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.navigate("MainAppRouter");
    });
    this.animate();
  };

  animate() {
    Animated.sequence([
      Animated.timing(this.AnimationValue, {
        toValue: 100,
        duration: 500,
        easing: Easing.ease
      }),
      Animated.timing(this.TextAnimationValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start();
  }

  render() {
    const position = this.AnimationValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"]
    });

    const left = this.AnimationValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["50%", "0%"]
    });

    const scale = this.TextAnimationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 0.99],
      outputRange: [0, 1, 1, 1.2, 0]
    });

    const opacity = this.TextAnimationValue.interpolate({
      inputRange: [0, 0.5, 0.75, 0.99],
      outputRange: [0, 1, 1, 0],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.screenContainer}>
        <ImageBackground
          source={bg}
          style={{ width: undefined, height: undefined, zIndex: 2 }}
        >
          <Animated.View
            style={{
              left,
              width: position,
              height: position,
              zIndex: 10,
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <AnimatedMainHeader
              style={{
                opacity,
                textAlign: "center",
                transform: [{ scale }]
              }}
            >
              Welcome{"\n"} {this.props.player}
            </AnimatedMainHeader>
          </Animated.View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFill,
    alignContent: "center",
    justifyContent: "center"
  }
});

export default SignInSuccess;
