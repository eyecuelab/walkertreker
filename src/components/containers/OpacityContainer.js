import React from "react";
import { View, StyleSheet } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const widthUnit = wp("1%");
// const heightUnit = hp("1%");

function OpacityContainer(props) {
  return (
    <View style={styles.default} {...props}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    padding: widthUnit * 4,
    flex: 1,
    backgroundColor: "rgba( 0, 0, 0, 0.4 )"
  }
});

export default OpacityContainer;
