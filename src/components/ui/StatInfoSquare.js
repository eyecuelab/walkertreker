import React from "react";
import {
  View,
  /* Text, */ StyleSheet /* , ImageBackground */
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import PropTypes from "prop-types";
import { Label } from "../text";

// const bg1 = require('../../../assets/buttontexture1.png');

// const heightUnit = hp('1%');

const widthUnit = wp("1%");

const styles = StyleSheet.create({
  container: {
    minWidth: widthUnit * 30,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: widthUnit * 7,
    paddingVertical: widthUnit * 5,
    backgroundColor: "#000"
  },
  text: {
    textAlign: "center"
  }
});

export default function StatInfoSquare(props) {
  return (
    <View style={styles.container}>
      <Label style={[styles.text, { color: "#FF0000" }]}>{props.label}</Label>
      <Label style={styles.text}>{props.value}</Label>
    </View>
  );
}

StatInfoSquare.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired
};
