import React from 'react';
import { View, StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const heightUnit = hp('1%');

function Footer(props) {
  return (
    <View style={styles.default}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
      justifyContent: 'flex-end',
      marginBottom: heightUnit*2,
  }
});

export default Footer;