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

const bg = require("../../../assets/use_item_bg.png");

const AnimatedMainHeader = Animated.createAnimatedComponent(MainHeader);
const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground
);

const styles = StyleSheet.create({
  screenContainer: {
    // ...StyleSheet.absoluteFill,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "black"
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
    console.log(
      "LEAVECAMPAIGNSUCESS componenet didMount for::",
      this.props.player
    );
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

  getOpacity = () => {};

  render() {
    const opacity1 = this.TextAnimationValue.interpolate({
      inputRange: [0, 0.5, 0.75, 0.99],
      outputRange: [0, 0.5, 0.75, 1],
      extrapolate: "clamp"
    });

    const opacity2 = this.TextAnimationValue.interpolate({
      inputRange: [0, 0.35, 0.7, 0.84],
      outputRange: [0, 1, 1, 0],
      extrapolate: "clamp"
    });

    const opacity3 = this.TextAnimationValue.interpolate({
      inputRange: [0.2, 0.5, 0.85, 0.99],
      outputRange: [0, 1, 1, 0],
      extrapolate: "clamp"
    });

    console.log("------------rendering leavecampaignsucess-----------");

    return (
      <View style={styles.screenContainer}>
        <ImageBackground
          source={bg}
          style={{ width: undefined, height: undefined, zIndex: 2 }}
        >
          <Animated.View
            style={{
              opacity: opacity1,
              backgroundColor: "black",
              zIndex: 10,
              alignContent: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%"
            }}
          >
            <AnimatedMainHeader
              style={{
                opacity: opacity2,
                textAlign: "center"
              }}
            >
              Until Next Time
            </AnimatedMainHeader>
            <AnimatedMainHeader
              style={{
                opacity: opacity3,
                textAlign: "center"
              }}
            >
              {this.props.player}
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
