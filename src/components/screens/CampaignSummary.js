import React from "react";
import {
  StyleSheet,
  Animated,
  View,
  ImageBackground,
  ToastAndroid,
  ScrollView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import AnimatedCampaignHeader from "../ui/AnimatedCampaignHeader";
import defaultStyle from "../../styles/defaultStyle";

import ThreeInfoSquares from "../ui/ThreeInfoSquares";
import SingleButtonFullWidth from "../ui/SingleButtonFullWidth";
import ScreenContainer from "../containers/ScreenContainer";

class CampaignSummary extends React.Component {
  constructor(props) {
    super(props);
    const toast = this.props.navigation.getParam("toast");
    if (toast) {
      this._showToast(toast.msg);
    }
    this.scrollY = new Animated.Value(0);
  }

  _displayStepPercentage = player => {
    const today = this.props.campaign.currentDay;

    // Code for Percentage based Display
    const percent = Math.floor(
      (player.steps[today] / player.stepTargets[today]) * 100
    );
    return `${percent} %`;

    // Code for xxxx / yyyy display

    // return `${player.steps[today]} / ${player.stepTargets[today]}`
  };

  _displayHealthLevel = player => {
    if (player.health > 0 && player.health < 34) {
      return "Poor";
    }
    if (player.health >= 34 && player.health < 67) {
      return "Fair";
    }
    if (player.health >= 67) {
      return "Good";
    }
    return "Dead";
  };

  _displayHungerLevel = player => {
    if (player.hunger > 0 && player.hunger < 34) {
      return "High";
    }
    if (player.hunger >= 34 && player.hunger < 67) {
      return "OK";
    }
    if (player.hunger >= 67) {
      return "Low";
    }
    return "Dead";
  };

  _onButtonPressInventory = () => {
    this.props.navigation.navigate("Inventory");
  };

  _onButtonPressSafehouse = () => {
    this.props.navigation.navigate("Safehouse");
  };

  _onButtonPressNothing = () => {
    return null;
  };

  // TODO: when INVENTORY is fleshed out, make sure to put this function in there too
  _submitConditionalRender = () => {
    if (this.props.player.steps && this.props.player.stepTargets) {
      const stepsToday = this.props.player.steps[
        this.props.campaign.currentDay
      ];
      const stepTargetToday = this.props.player.stepTargets[
        this.props.campaign.currentDay
      ];
      if (stepsToday > stepTargetToday) {
        // if (false) {
        return (
          <View style={{ width: "100%" }}>
            <View style={customStyles.buttonContainer}>
              <SingleButtonFullWidth
                title="Safehouse"
                backgroundColor="black"
                onButtonPress={this._onButtonPressSafehouse}
              />
            </View>
          </View>
        );
      }
      return (
        <View style={{ width: "100%" }}>
          <View style={customStyles.buttonContainer}>
            <SingleButtonFullWidth
              title="Safehouse"
              backgroundColor="darkgray"
              onButtonPress={this._onButtonPressNothing}
            />
          </View>
        </View>
      );
    }
    return null;
  };

  _showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  render() {
    return (
      <View style={{ backgroundColor: "#871C1D" }}>
        <ImageBackground
          source={this.props.screenProps.backgroundImage}
          style={{ width: "100%", height: "100%" }}
        >
          <ScreenContainer>
            <AnimatedCampaignHeader
              title="Summary"
              scrollY={this.scrollY}
              style={{ borderColor: "#FFF", borderBottomWidth: 1 }}
            />

            <ScrollView
              style={{ flex: 1, marginTop: 20 }}
              scrollEventThrottle={16}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: this.scrollY } } }
              ])}
            >
              {this.props.campaign.players.map(player => {
                return (
                  <View
                    key={player.id}
                    style={customStyles.playerInfoContainer}
                  >
                    <ThreeInfoSquares
                      title={player.displayName}
                      player={player}
                      bigValue
                      button1label="Progress"
                      button1value={this._displayStepPercentage(player)}
                      button2label="Health"
                      button2value={this._displayHealthLevel(player)}
                      button3label="Hunger"
                      button3value={this._displayHungerLevel(player)}
                    />
                  </View>
                );
              })}
            </ScrollView>

            <View style={customStyles.bottom}>
              {this._submitConditionalRender()}
            </View>
          </ScreenContainer>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    marginTop: widthUnit * 2,
    width: "100%",
    height: heightUnit * 8,
    alignItems: "center",
    justifyContent: "center"
  },
  bottom: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: widthUnit * 2
  },
  playerInfoContainer: {
    marginTop: heightUnit * 2,
    marginBottom: heightUnit * 2
  },
  scrollContainer: {
    marginTop: heightUnit * 2.5
  }
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    steps: state.steps
  };
}

export default connect(mapStateToProps)(CampaignSummary);
