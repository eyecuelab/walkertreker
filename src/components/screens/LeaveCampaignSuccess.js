import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  InteractionManager,
  ImageBackground
} from "react-native";
import { MainHeader } from "../text";
import PropTypes from "prop-types";

const bg = require("../../../assets/bg.png");

const AnimatedMainHeader = Animated.createAnimatedComponent(MainHeader);
// const AnimatedImageBackground = Animated.createAnimatedComponent(
//   ImageBackground
// );

const styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFill,
    alignContent: "center",
    justifyContent: "center"
  }
});

class LeaveCampaignSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.AnimationValue = new Animated.Value(0);
    this.TextAnimationValue = new Animated.Value(0);
  }

  componentDidMount = () => {
    console.log("this.props.player", this.props.player);
    InteractionManager.runAfterInteractions(() => {
      console.log("attempting to navigate to Auth");
      this.props.navigation.navigate("Auth");
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
              Biiiiiyyyyyyyy{"\n"} {this.props.player}
            </AnimatedMainHeader>
          </Animated.View>
        </ImageBackground>
      </View>
    );
  }
}

export default LeaveCampaignSuccess;

LeaveCampaignSuccess.propTypes = {
  player: PropTypes.string.isRequired,
  navigation: PropTypes.shape().isRequired
};
