import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import {
  widthPercentageToDP as wp
  /* heightPercentageToDP as hp */
} from "react-native-responsive-screen";

const widthUnit = wp("1%");
// const heightUnit = hp('1%');
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 6
  },
  active: {
    color: "darkred"
  },
  inactive: {
    color: "white"
  },
  valueContainer: {
    flex: 9,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  labelContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  value: {
    fontFamily: "gore",
    fontSize: widthUnit * 5
  },
  bigValue: {
    fontFamily: "gore",
    fontSize: widthUnit * 7
  },
  label: {
    fontFamily: "gore",
    fontSize: widthUnit * 4
  },
  red: {
    color: "darkred"
  },
  green: {
    color: "#68ae5b"
  }
});

export default class ButtonToggle extends React.Component {
  render() {
    const toggle = this.props.active ? styles.active : styles.inactive;
    const valueFontStyle = this.props.bigValue ? styles.bigValue : styles.value;
    const activeTint = this.props.active ? "white" : "black";
    const color = colorProps => {
      if (colorProps === "red") {
        return styles.red;
      }
      if (colorProps === "green") {
        return styles.green;
      }
      return styles.red;
    };

    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={this.props.background}
        tintColor={activeTint}
      >
        <View style={[styles.container, toggle]}>
          <Text style={[toggle, valueFontStyle, color(this.props.color)]}>
            {this.props.value}
          </Text>

          <Text style={[styles.label, toggle, color(this.props.color)]}>
            {this.props.label}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

ButtonToggle.propTypes = {
  value: PropTypes.string,
  bigValue: PropTypes.bool,
  label: PropTypes.string,
  active: PropTypes.bool,
  color: PropTypes.string,
  background: PropTypes.number
};

// This only toggles when rendered from the CreateCampaign component
// but not from the CampaignSummary component

ButtonToggle.defaultProps = {
  active: false,
  bigValue: false,
  value: "",
  label: "",
  color: "",
  background: 0
};
