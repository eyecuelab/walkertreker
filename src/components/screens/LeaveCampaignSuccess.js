import React, { Component } from "react";
import {
  View,
  Animated,
  InteractionManager,
  Easing,
  StyleSheet
} from "react-native";
import { MainHeader } from "../text";
import PropTypes from "prop-types";

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

  render() {
    console.log("------------rendering leavecampaignsucess-----------");
    return (
      <View style={styles.screenContainer}>
        <MainHeader>
          Biiiiiyyyyyyyy{"\n"} {this.props.player}
        </MainHeader>
      </View>
    );
  }
}

export default LeaveCampaignSuccess;

LeaveCampaignSuccess.propTypes = {
  player: PropTypes.string.isRequired,
  navigation: PropTypes.shape().isRequired
};
