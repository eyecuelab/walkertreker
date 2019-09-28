import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import defaultStyle from "../../styles/defaultStyle";

const bg1 = require("../../../assets/buttontexture1.png");

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: heightUnit * 8,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function SingleButtonFullWidth(props) {
  return (
    <TouchableHighlight
      style={[
        customStyles.container,
        { backgroundColor: props.backgroundColor },
        { marginTop: props.marginTop || 0 }
      ]}
      onPress={props.onButtonPress}
    >
      <Text style={styles.label}>{props.title}</Text>
    </TouchableHighlight>
  );
}

SingleButtonFullWidth.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  onButtonPress: PropTypes.func,
  marginTop: PropTypes.number
};

SingleButtonFullWidth.defaultProps = {
  title: "",
  backgroundColor: "black",
  onButtonPress: () => {},
  marginTop: 0
};
